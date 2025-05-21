import { Response, Request ,NextFunction} from 'express';

import { Container} from 'typedi';

import config from '../../config';

import IUserRepo from '../services/IRepos/IUserRepo';

import { UserMap } from "../mappers/UserMap";
import { IUserDTO } from '../dto/IUserDTO';

import { Inject, Service } from 'typedi';

import IUserController from "./IControllers/IUserController";

import { Result } from "../core/logic/Result";
import IUserService from '../services/IServices/IUserService';
import winston from 'winston';
import jwt from 'jsonwebtoken';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Service()
export default class UserController implements IUserController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.user.name) private userServiceInstance : IUserService
  ) {}


    public async getUsers(req: any, res: Response, next: NextFunction) {
        try {
            const userOrError = await this.userServiceInstance.getAllUsers() as Result<Array<IUserDTO>>;
              
            if (userOrError.isFailure) {
              return res.status(402).send();
            }
      
            const users = userOrError.getValue();
            return res.json( users ).status(201);
          }
          catch (e) {
            return next(e);
          }
    }

  public async signIn(req: Request, res: Response, next: NextFunction){
    const logger = Container.get('logger') as winston.Logger;
    logger.debug('Calling Sign-In endpoint with body: %o', req.body)
    try {
      const { email, password } = req.body;
      const result = await this.userServiceInstance.SignIn(email, password);
      
      if( result.isFailure )
        return res.status(403).json(result.errorValue());

      const { userDTO, token } = result.getValue();
      return res.json({ userDTO, token }).status(200);

    } catch (e) {
      logger.error('🔥 error: %o',  e );
      return next(e);
    }
  }

  public async signUp(req: Request, res: Response, next: NextFunction){
    const logger = Container.get('logger') as winston.Logger;
    logger.debug('Calling Sign-Up endpoint with body: %o', req.body )

    try {
      const userOrError = await this.userServiceInstance.SignUp(req.body as IUserDTO);

      if (userOrError.isFailure) {
        logger.debug(userOrError.errorValue())
        return res.status(401).send(userOrError.errorValue());
      }
  
      const userDTO = userOrError.getValue();

      return res.status(201).json( userDTO );
    } catch (e) {
      //logger.error('🔥 error: %o', e);
      return next(e);
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction){
    const logger = Container.get('logger') as winston.Logger;
    logger.debug('Calling Sign-Out endpoint with body: %o', req.body)
    try {
      //@TODO AuthService.Logout(req.user) do some clever stuff
      return res.status(200).end();
    } catch (e) {
      logger.error('🔥 error %o', e);
      return next(e);
    }
  }

  public async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userOrError = await this.userServiceInstance.createUser(req.body as IUserDTO) as Result<IUserDTO>;
      if (userOrError.isFailure) {
        return res.status(402).send(userOrError.errorValue());
      }

      const userDTO = userOrError.getValue();
      return res.json( userDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const roleOrError = await this.userServiceInstance.editUser(req.body as IUserDTO) as Result<IUserDTO>;

      if (roleOrError.isFailure) {
        return res.status(404).send();
      }

      const roleDTO = roleOrError.getValue();
      return res.status(201).json( roleDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async getMe(req, res: Response, next: NextFunction){

    const user = await this.userServiceInstance.getUserById( req.param.id );
    if (user.isFailure)
    return res.json( new Error("Utilizador não registado")).status(401);

    return res.json( user.getValue() ).status(200);
  }

  public async deleteMe(req, res: Response, next: NextFunction){

    const user = await this.userServiceInstance.deleteUser( req.param.id );
    if (user.isFailure)
    return res.json( new Error("Utilizador não registado")).status(401);

  
    return res.json(user.getValue()).status(200);
  }


  public async getUsersByRole(req:Request, res: Response, next: NextFunction){
    try {
      let aux=req.params.role;

      const userOrError = await this.userServiceInstance.getUsersByRole(aux) as Result<IUserDTO[]>;

      if (userOrError.isFailure) {
        return res.status(402).json(userOrError.errorValue()).send();
      }

      const userDTO = userOrError.getValue();
      return res.status(200).json( userDTO );
    }
    catch (e) {
      return next(e);
    }
  }

  public async getUserById(req:Request, res: Response, next: NextFunction){
    try {
      let aux=req.params.id;

      const userOrError = await this.userServiceInstance.getUserById(aux) as Result<IUserDTO>;

      if (userOrError.isFailure) {
        return res.status(402).json(userOrError.errorValue()).send();
      }

      const userDTO = userOrError.getValue();
      return res.status(200).json( userDTO );
    }
    catch (e) {
      return next(e);
    }
  }

  public async getUsersRequest(req: Request, res: Response, next: NextFunction){
    try {

      const userOrError = await this.userServiceInstance.getUsersRequests() as Result<IUserDTO[]>;

      if (userOrError.isFailure) {
        return res.status(402).json(userOrError.errorValue()).send();
      }

      const userDTO = userOrError.getValue();
      return res.status(200).json( userDTO );
    }
    catch (e) {
      return next(e);
    }
  }

  public async acceptUser(req:Request, res: Response, next: NextFunction){
    try {
      let userId=req.params.id;

      const token = req.headers.authorization?.substring("Bearer ".length);

      if (!token) {
        return res.status(401).json({ error: 'Invalid or missing token' });
      }

      let decisionUserId: string;

      try {
        const decodedToken = jwt.verify(token, config.jwtSecret) as { id: string };
        decisionUserId = decodedToken.id;
      } catch (error) {
        // Token verification failed
        return res.status(401).json({ error: 'Invalid token' });
      }

      const userOrError = await this.userServiceInstance.acceptUser(userId, decisionUserId) as Result<IUserDTO>;

      if (userOrError.isFailure) {
        return res.status(402).json(userOrError.errorValue()).send();
      }

      const userDTO = userOrError.getValue();
      return res.status(200).json( userDTO );
    }
    catch (e) {
      return next(e);
    }
  }

  public async rejectUser(req:Request, res: Response, next: NextFunction){
    try {
      const userId = req.params.id;

      const token = req.headers.authorization?.substring("Bearer ".length);

      if (!token) {
        return res.status(401).json({ error: 'Invalid or missing token' });
      }

      let decisionUserId: string;

      try {
        const decodedToken = jwt.verify(token, config.jwtSecret) as { id: string };
        decisionUserId = decodedToken.id;
      } catch (error) {
        // Token verification failed
        return res.status(401).json({ error: 'Invalid token' });
      }

      const userOrError = await this.userServiceInstance.rejectUser(userId, decisionUserId) as Result<IUserDTO>;

      if (userOrError.isFailure) {
        return res.status(402).json(userOrError.errorValue()).send();
      }

      const userDTO = userOrError.getValue();
      return res.status(200).json( userDTO );
    }
    catch (e) {
      return next(e);
    }
  }
  


}
