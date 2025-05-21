import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IRoomController from "./IControllers/IRoomController";
import IRoomService from '../services/IServices/IRoomService';
import IRoomDTO from '../dto/IRoomDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class RoomController implements IRoomController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.room.name) private roomServiceInstance : IRoomService
  ) {}

  public async createRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const roomOrError = await this.roomServiceInstance.createRoom(req.body as IRoomDTO) as Result<IRoomDTO>;
        
      if (roomOrError.isFailure) {
        return res.status(402).json(roomOrError.errorValue()).send();
      }

      const roomDTO = roomOrError.getValue();
      return res.status(201).json( roomDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async listRoomsByFloorId(req: Request, res: Response, next: NextFunction){
    try {

      let aux=req.params.id;
      const roomOrError = await this.roomServiceInstance.listRoomsByFloorId(aux) as Result<IRoomDTO[]>;
        
      if (roomOrError.isFailure) {
        return res.status(402).json(roomOrError.errorValue()).send();
      }

      const roomDTO = roomOrError.getValue();
      return res.status(200).json( roomDTO );
    }
    catch (e) {
      return next(e);
    }
  }

  public async listRooms(req: Request, res: Response, next: NextFunction){
  
    try{

      const roomOrError = await this.roomServiceInstance.listRooms() as Result<IRoomDTO[]>;

      if (roomOrError.isFailure) {
        return res.status(402).json(roomOrError.errorValue()).send();
      }

      const roomDTO = roomOrError.getValue();
      return res.json( roomDTO ).status(200);

    } catch (e) {
      return next(e);
    }
  
  }
}