import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IRoomPersistence } from '../dataschema/IRoomPersistence';

import IRoomDTO from "../dto/IRoomDTO";
import { Room } from "../domain/room";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class RoomMap extends Mapper<Room> {
  
  public static toDTO( room: Room): IRoomDTO {
    return {
      id: room.id.toString(),
      floorId: room.floorId,
      name: room.name,
      category: room.category,
      description: room.description,
      posX: room.posX,
      posY: room.posY,
      width: room.width,
      height: room.height,
      doorPosX: room.doorPosX,
      doorPosY: room.doorPosY,
    } as IRoomDTO;
  }

  public static toDomain (room: any | Model<IRoomPersistence & Document> ): Room {
    const roomOrError = Room.create(
      room,
      new UniqueEntityID(room.domainId)
    );

    roomOrError.isFailure ? console.log(roomOrError.error) : '';

    return roomOrError.isSuccess ? roomOrError.getValue() : null;
  }

  public static toPersistence (room: Room): any {
    return {
      domainId: room.id.toString(),
      floorId: room.floorId,
      name: room.name,
      category: room.category,
      description: room.description,
      posX: room.posX,
      posY: room.posY,
      width: room.width,
      height: room.height,
      doorPosX: room.doorPosX,
      doorPosY: room.doorPosY,
    }
  }
}