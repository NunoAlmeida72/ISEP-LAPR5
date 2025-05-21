import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IRobotController from "./IControllers/IRobotController";
import IRobotService from '../services/IServices/IRobotService';
import IRobotDTO from '../dto/IRobotDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class RobotController implements IRobotController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.robot.name) private robotServiceInstance : IRobotService
  ) {}

  public async createRobot(req: Request, res: Response, next: NextFunction) {
    try {
      const robotOrError = await this.robotServiceInstance.createRobot(req.body as IRobotDTO) as Result<IRobotDTO>;
        
      if (robotOrError.isFailure) {
        return res.status(402).json(robotOrError.errorValue()).send();
      }

      const robotDTO = robotOrError.getValue();
      return res.status(201).json( robotDTO );
    }
    catch (e) {
      return next(e);
    }
  }

  public async disableRobot(req: Request, res: Response, next: NextFunction) {
    try {
      const robotOrError = await this.robotServiceInstance.disableRobot(req.body.id) as Result<IRobotDTO>;
        
      if (robotOrError.isFailure) {
        return res.status(402).json(robotOrError.errorValue()).send();
      }

      const robotDTO = robotOrError.getValue();
      return res.status(200).json( robotDTO );
    }
    catch (e) {
      return next(e);
    }
  }

  public async listRobots(req: Request, res: Response, next: NextFunction) {
    try{
      const robotOrError = await this.robotServiceInstance.listAllRobots() as Result<Array<IRobotDTO>>;
        
      if (robotOrError.isFailure) {
        return res.status(402).json(robotOrError.errorValue()).send();
      }

      const robotsDTO = robotOrError.getValue();
      return res.json( robotsDTO ).status(200);
    }catch(e){
      return next(e);
    }
      
  }

  public async listRobotNames(req: Request, res: Response, next: NextFunction) {
    try{
      
      const robotNameOrError = await this.robotServiceInstance.listRobotNames() as Result<Array<string>>;
        
      if (robotNameOrError.isFailure) {
        return res.status(402).json(robotNameOrError.errorValue()).send();
      }

      const robotNames = robotNameOrError.getValue();
      return res.json( robotNames ).status(200);
    }catch(e){
      return next(e);
    }
      
  }


  public async listRobotsByTaskOrDesignation(req: Request, res: Response, next: NextFunction) {
    try{
      let aux = req.params.TaskOrDesignation

      const robotOrError = await this.robotServiceInstance.listRobotsByTaskOrDesignation(aux) as Result<Array<IRobotDTO>>;
        
      if (robotOrError.isFailure) {
        return res.status(402).json(robotOrError.errorValue()).send();
      }

      const robotsDTO = robotOrError.getValue();
      return res.json( robotsDTO ).status(200);
    }catch(e){
      return next(e);
    }
      
  }

  public async listRobotsByRobotType(req: Request, res: Response, next: NextFunction) {
    try{
      let aux = req.params.id

      const robotOrError = await this.robotServiceInstance.listRobotsByRobotType(aux) as Result<Array<IRobotDTO>>;
        
      if (robotOrError.isFailure) {
        return res.status(402).json(robotOrError.errorValue()).send();
      }

      const robotsDTO = robotOrError.getValue();
      return res.json( robotsDTO ).status(200);
    }catch(e){
      return next(e);
    }
      
  }

}