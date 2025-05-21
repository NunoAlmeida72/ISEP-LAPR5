import { Service, Inject } from 'typedi';

import { Document, Model } from 'mongoose';
import { IUserPersistence } from '../dataschema/IUserPersistence';

import IUserRepo from "../services/IRepos/IUserRepo";
import { User } from "../domain/user";
import { UserId } from "../domain/userId";
import { UserEmail } from "../domain/userEmail";
import { UserMap } from "../mappers/UserMap";
import { Role } from '../domain/role';
import { Status } from '../domain/status';

@Service()
export default class UserRepo implements IUserRepo {
  private models: any;

  constructor(
    @Inject('userSchema') private userSchema : Model<IUserPersistence & Document>,
    @Inject('logger') private logger
  ) { }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (userId: UserId | string): Promise<boolean> {

    const idX = userId instanceof UserId ? (<UserId>userId).id.toValue() : userId;

    const query = { domainId: idX}; 
    const userDocument = await this.userSchema.findOne( query );

    return !!userDocument === true;
  }

   public async findAll(): Promise<User[]> {
    const userRecord = await this.userSchema.find();

    let users=[];

    if(userRecord){
      for(let i=0;i<userRecord.length;i++){
        users.push(await UserMap.toDomain(userRecord[i]));
      }
    }

    return users;

  }

  public async save (user: User): Promise<User> {
    const query = { domainId: user.id.toString() }; 

    const userDocument = await this.userSchema.findOne( query );

    try {
      if (userDocument === null ) {
        const rawUser: any = UserMap.toPersistence(user);

        const userCreated = await this.userSchema.create(rawUser);

        return UserMap.toDomain(userCreated);
      } else {
        userDocument.firstName = user.firstName;
        userDocument.lastName = user.lastName;
        userDocument.nif=user.nif;
        userDocument.role=user.role.id.toString();
        userDocument.phoneNumber=user.phoneNumber;
        userDocument.email=user.email.value;
        userDocument.status=user.status;
        userDocument.registrationDate=user.registrationDate;
        userDocument.decisionDate=user.decisionDate;
        userDocument.decisionUserId=user.decisionUserId;
        await userDocument.save();

        return user;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByEmail (email: UserEmail | string): Promise<User> {
    const query = { email: email.toString() };
    const userRecord = await this.userSchema.findOne( query );

    if( userRecord != null) {
      return await UserMap.toDomain(userRecord);
    }
    else
      return null;
  }

  public async findById (userId: UserId | string): Promise<User> {

    const idX = userId instanceof UserId ? (<UserId>userId).id.toValue() : userId;

    const query = { domainId: idX }; 
    const userRecord = await this.userSchema.findOne( query );

    if( userRecord != null) {
      return await UserMap.toDomain(userRecord);
    }
    else
      return null;
  }

  public async deleteUser (userId: UserId | string): Promise<User> {

    const idX = userId instanceof UserId ? (<UserId>userId).id.toValue() : userId;

    const query = { domainId: idX }; 
    const userRecord = await this.userSchema.findOne( query );

    if( userRecord != null) {
      const user = await UserMap.toDomain(userRecord);

      await this.userSchema.deleteOne(query);
      return user
    }
    else
      return null;
  }

  public async findByPhoneNumber (phoneNumber: number): Promise<User> {
    const query = { phoneNumber: phoneNumber };
    const userRecord = await this.userSchema.findOne( query );

    if( userRecord != null) {
      return await UserMap.toDomain(userRecord);
    }
    else
      return null;
  }

  public async findByNif (nif: number): Promise<User> {
    const query = { nif: nif };
    const userRecord = await this.userSchema.findOne( query );

    if( userRecord != null) {
      return await UserMap.toDomain(userRecord);
    }
    else
      return null;
  }

  public async findAllByRole(role: Role): Promise<User[]> {
      const query={role:role.id};
      const userRecord= await this.userSchema.find(query);

      let users=[];

      if(userRecord){
        for(let i=0;i<userRecord.length;i++){
          users.push(await UserMap.toDomain(userRecord[i]));
        }
      }

      return users;
  }

  public async findByStatus(status: Status): Promise<User[]> {
    const query={status:status};
    const userRecord= await this.userSchema.find(query);

    let users=[];

    if(userRecord){
      for(let i=0;i<userRecord.length;i++){
        users.push(await UserMap.toDomain(userRecord[i]));
      }
    }

    return users;
  }
}