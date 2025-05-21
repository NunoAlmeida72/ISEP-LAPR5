import { Request, Response, NextFunction } from "express";
import { Inject, Service } from "typedi";
import config from "../../config";

import IElevatorController from "./IControllers/IElevatorController";
import IElevatorService from "../services/IServices/IElevatorService";
import IElevatorDTO from "../dto/IElevatorDTO";

import { Result } from "../core/logic/Result";

@Service()
export default class ElevatorController implements IElevatorController /* TODO: extends ../core/infra/BaseController */ {

    constructor(
        @Inject(config.services.elevator.name) private elevatorServiceInstance : IElevatorService
    ) {}
    
    public async createElevator(req: Request, res: Response, next: NextFunction) {
        try{        
            
            const elevatorOrError = await this.elevatorServiceInstance.createElevator(req.body as IElevatorDTO) as Result<IElevatorDTO>;

            if (elevatorOrError.isFailure) {
                return res.status(402).json(elevatorOrError.errorValue()).send();
            }

            const elevatorDTO = elevatorOrError.getValue();
            return res.status(201).json( elevatorDTO );
            
            }catch(e){
                
            return next(e);
        }
    }

    public async updateElevator(req: Request, res: Response, next: NextFunction) {
        try{
            const elevatorOrError = await this.elevatorServiceInstance.updateElevator(req.body as IElevatorDTO) as Result<IElevatorDTO>;

            if (elevatorOrError.isFailure) {
                return res.status(402).json(elevatorOrError.errorValue()).send();
            }

            const elevatorDTO = elevatorOrError.getValue();
            return res.status(201).json( elevatorDTO );
            
            }catch(e){
                
            return next(e);
        }
    }

    public async listElevators(req: Request, res: Response, next: NextFunction) {

        try{
            let aux = req.params.buildingId;

            const elevatorOrError = await this.elevatorServiceInstance.listElevators(aux) as Result<Array<IElevatorDTO>>;

            if (elevatorOrError.isFailure) {
                return res.status(402).json(elevatorOrError.errorValue()).send();
            }

            const elevatorsDTO = elevatorOrError.getValue();
            
            return res.json( elevatorsDTO ).status(200);

        } catch(e){
            return next(e);
        }

    }
    


}