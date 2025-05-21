import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IBuildingConnectionController from "./IControllers/IBuildingConnectionController";
import IBuildingConnectionService from '../services/IServices/IBuildingConnectionService';
import IBuildingConnectionDTO from '../dto/IBuildingConnectionDTO';

import { Result } from "../core/logic/Result";
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Service()
export default class BuildingConnectionController implements IBuildingConnectionController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.buildingConnection.name) private buildingConnectionServiceInstance : IBuildingConnectionService
  ) {}

  public async createBuildingConnection(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingConnectionOrError = await this.buildingConnectionServiceInstance.createBuildingConnection(req.body as IBuildingConnectionDTO) as Result<IBuildingConnectionDTO>;
        
      if (buildingConnectionOrError.isFailure) {
        return res.status(402).json(buildingConnectionOrError.errorValue()).send();
      }

      const buildingConnectionDTO = buildingConnectionOrError.getValue();
      return res.status(201).json( buildingConnectionDTO );
    }
    catch (e) {
      return next(e);
    }
  };
  
  public async listBuildingConnections(req: Request, res: Response, next: NextFunction) {
    try{
      let aux1 = req.params.id1;
      let aux2 = req.params.id2;

      const buildingConnectionOrError = await this.buildingConnectionServiceInstance.listBuildingConnections(aux1, aux2) as Result<Array<IBuildingConnectionDTO>>;
        
      if (buildingConnectionOrError.isFailure) {
        return res.status(402).json(buildingConnectionOrError.errorValue()).send();
      }

      const buildingConnectionsDTO = buildingConnectionOrError.getValue();
      return res.json( buildingConnectionsDTO ).status(200);
    }catch(e){
      return next(e);
    }
      
  }

  public async updateBuildingConnection(req: Request, res: Response, next: NextFunction) {
    try{
      const buildingConnectionOrError = await this.buildingConnectionServiceInstance.updateBuildingConnection(req.body as IBuildingConnectionDTO) as Result<IBuildingConnectionDTO>;
        
      if (buildingConnectionOrError.isFailure) {
        return res.status(402).json(buildingConnectionOrError.errorValue()).send();
      }

      const buildingConnectionDTO = buildingConnectionOrError.getValue();
      return res.json( buildingConnectionDTO ).status(200);
    }catch(e){
      return next(e);
    }
      
  }

  public async getBuildingConnectionsByFloorId(req: Request, res: Response, next: NextFunction) {
    try{
      let aux=req.params.id;
      const buildingConnectionOrError = await this.buildingConnectionServiceInstance.getBuildingConnectionsByFloorId(aux) as Result<IBuildingConnectionDTO[]>;
        
      if (buildingConnectionOrError.isFailure) {
        return res.status(402).json(buildingConnectionOrError.errorValue()).send();
      }

      const buildingConnectionDTO = buildingConnectionOrError.getValue();
      return res.json( buildingConnectionDTO ).status(200);
    }catch(e){
      return next(e);
    }
  }
}