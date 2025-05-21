import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IRobotTypeController from './IControllers/IRobotTypeController';
import IRobotTypeService from '../services/IServices/IRobotTypeService';
import IRobotTypeDTO from '../dto/IRobotTypeDTO';

import { Result } from "../core/logic/Result";


@Service()
export default class RobotTypeController implements IRobotTypeController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.robotType.name) private robotTypeServiceInstance : IRobotTypeService
  ) {}

  public async createRobotType(req: Request, res: Response, next: NextFunction) {
    try {
      const robotTypeOrError = await this.robotTypeServiceInstance.createRobotType(req.body as IRobotTypeDTO) as Result<IRobotTypeDTO>;
        
      if (robotTypeOrError.isFailure) {
        return res.status(402).json(robotTypeOrError.errorValue()).send();
      }

      const robotTypeDTO = robotTypeOrError.getValue();
      return res.status(201).json( robotTypeDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async listRobotTypes(req: Request, res: Response, next: NextFunction) {
    try{
      const robotTypeOrError = await this.robotTypeServiceInstance.listAllRobotTypes() as Result<Array<IRobotTypeDTO>>;
        
      if (robotTypeOrError.isFailure) {
        return res.status(402).json(robotTypeOrError.errorValue()).send();
      }

      const robotTypesDTO = robotTypeOrError.getValue();
      return res.json( robotTypesDTO ).status(200);
    }catch(e){
      return next(e);
    }
      
  }

  
}