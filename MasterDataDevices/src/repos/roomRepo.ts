import { Service, Inject } from 'typedi';

import IRoomRepo from "../services/IRepos/IRoomRepo";
import { Room } from "../domain/room";
import { RoomId } from "../domain/roomId";
import { RoomMap } from "../mappers/RoomMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IRoomPersistence } from '../dataschema/IRoomPersistence';

@Service()
export default class RoomRepo implements IRoomRepo {
  private models: any;

  constructor(
    @Inject('roomSchema') private roomSchema : Model<IRoomPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(room: Room): Promise<boolean> {
    
    const idX = room.id instanceof RoomId ? (<RoomId>room.id).toValue() : room.id;

    const query = { domainId: idX}; 
    const roomDocument = await this.roomSchema.findOne( query as FilterQuery<IRoomPersistence & Document>);

    return !!roomDocument === true;
  }

  public async save (room: Room): Promise<Room> {
    const query = { domainId: room.id.toString()}; 

    const roomDocument = await this.roomSchema.findOne( query );

    try {
      if (roomDocument === null ) {
        const rawRoom: any = RoomMap.toPersistence(room);

        const roomCreated = await this.roomSchema.create(rawRoom);

        return RoomMap.toDomain(roomCreated);
      } else {
        roomDocument.floorId = room.floorId;
        roomDocument.name = room.name;
        roomDocument.category = room.category;
        roomDocument.description= room.description;
        roomDocument.posX=room.posX;
        roomDocument.posY=room.posY;
        roomDocument.width=room.width;
        roomDocument.height=room.height;
        roomDocument.doorPosX = room.doorPosX;
        roomDocument.doorPosY = room.doorPosY;
        await roomDocument.save();

        return room;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (roomId: RoomId | string): Promise<Room> {
    const query = { domainId: roomId};
    const roomRecord = await this.roomSchema.findOne( query as FilterQuery<IRoomPersistence & Document> );

    if( roomRecord != null) {
      return RoomMap.toDomain(roomRecord);
    }
    else
      return null;
  }

  public async findAll(): Promise<Room[]> {
      const roomResult = await this.roomSchema.find();
      const rooms = []
      if(roomResult.length != 0){
        roomResult.forEach((element) => {
          rooms.push(RoomMap.toDomain(element));
        })
      }
      return rooms;
  }

  public async findByFloorId(floorId: string): Promise<Room[]> {
    const query = { floorId: floorId };
    const roomRecord = await this.roomSchema.find(query as FilterQuery<IRoomPersistence & Document>);

    const rooms =[]
    
    if(roomRecord.length != 0){
      roomRecord.forEach((element) => {
        rooms.push(RoomMap.toDomain(element));
      })
    }
    return rooms;
  }
}