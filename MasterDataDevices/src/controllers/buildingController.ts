import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IBuildingController from "./IControllers/IBuildingController";
import IBuildingService from '../services/IServices/IBuildingService';
import IBuildingDTO from '../dto/IBuildingDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class BuildingController implements IBuildingController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.building.name) private buildingServiceInstance : IBuildingService
  ) {}

  public async createBuilding(req: Request, res: Response, next: NextFunction) {
    try {
      const buildingOrError = await this.buildingServiceInstance.createBuilding(req.body as IBuildingDTO) as Result<IBuildingDTO>;
        
      if (buildingOrError.isFailure) {
        return res.status(402).json(buildingOrError.errorValue()).send();
      }

      const buildingDTO = buildingOrError.getValue();
      return res.status(201).json( buildingDTO );
    }
    catch (e) {
      return next(e);
    }
  };
  
  public async listBuildings(req: Request, res: Response, next: NextFunction) {
    try{
      const buildingOrError = await this.buildingServiceInstance.listBuildings() as Result<Array<IBuildingDTO>>;
        
      if (buildingOrError.isFailure) {
        return res.status(402).json(buildingOrError.errorValue()).send();
      }

      const buildingsDTO = buildingOrError.getValue();
      return res.json( buildingsDTO ).status(200);
    }catch(e){
      return next(e);
    }
      
  }

  public async listBuildingsInFloorLimit(req: Request, res: Response, next: NextFunction) {
    try{
      let min = req.params.min;
      let max = req.params.max;
      const buildings = await this.buildingServiceInstance.listBuildingsInFloorLimit(+min, +max) as Result<Array<IBuildingDTO>>;
        
      if (buildings.isFailure) {
        return res.status(402).json(buildings.errorValue()).send();
      }

      const buildingsDTO = buildings.getValue();
      return res.json( buildingsDTO ).status(200);
    }catch(e){
      return next(e);
    }
      
  }

  public async updateBuilding(req: Request, res: Response, next: NextFunction) {
    try{
      const buildingOrError = await this.buildingServiceInstance.updateBuilding(req.body as IBuildingDTO) as Result<IBuildingDTO>;
        
      if (buildingOrError.isFailure) {
        return res.status(402).json(buildingOrError.errorValue()).send();
      }
      
      const buildingDTO = buildingOrError.getValue();
      return res.json( buildingDTO ).status(200);
    }catch(e){
      return next(e);
    }
      
  }
}