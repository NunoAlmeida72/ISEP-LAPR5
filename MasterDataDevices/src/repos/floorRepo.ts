import { Service, Inject } from 'typedi';

import IFloorRepo from "../services/IRepos/IFloorRepo";
import { Floor } from "../domain/floor";
import { FloorId } from "../domain/floorId";
import { FloorMap } from "../mappers/FloorMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IFloorPersistence } from '../dataschema/IFloorPersistence';

@Service()
export default class FloorRepo implements IFloorRepo {
  private models: any;

  constructor(
    @Inject('floorSchema') private floorSchema : Model<IFloorPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(floor: Floor): Promise<boolean> {
    
    const idX = floor.id instanceof FloorId ? (<FloorId>floor.id).toValue() : floor.id;

    const query = { domainId: idX}; 
    const buildingDocument = await this.floorSchema.findOne( query as FilterQuery<IFloorPersistence & Document>);

    return !!buildingDocument === true;
  }

  public async save (floor: Floor): Promise<Floor> {
    const query = { domainId: floor.id.toString()}; 

    const floorDocument = await this.floorSchema.findOne( query );

    try {
      if (floorDocument === null ) {
        const rawFloor: any = FloorMap.toPersistence(floor);

        const floorCreated = await this.floorSchema.create(rawFloor);

        return FloorMap.toDomain(floorCreated);
      } else {
        floorDocument.buildingId = floor.buildingId;
        floorDocument.number = floor.number;
        floorDocument.description = floor.description;
        floorDocument.map = floor.map;
        floorDocument.initialPosition = floor.initialPosition;
        floorDocument.initialDirection = floor.initialDirection;
        await floorDocument.save();

        return floor;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (floorId: FloorId | string): Promise<Floor> {
    const query = { domainId: floorId};
    const floorRecord = await this.floorSchema.findOne( query as FilterQuery<IFloorPersistence & Document> );

    if( floorRecord != null) {
      return FloorMap.toDomain(floorRecord);
    }
    else
      return null;
  }

  public async findByBuildingId (buildingId: string): Promise<Floor[]> {
    const query = { buildingId: buildingId };
    const floorsRecord = await this.floorSchema.find( query as FilterQuery<IFloorPersistence & Document> );

    const floors=[]

    if(floorsRecord.length != 0){
      floorsRecord.forEach((element) => {
        floors.push(FloorMap.toDomain(element));
      })
    }
    return floors;
  }

  public async floorInLimit (buildingId: string, min : number, max : number): Promise<boolean> {
    const query = { buildingId: buildingId };
    const floorRecord = await this.floorSchema.find( query as FilterQuery<IFloorPersistence & Document>);
    
    if(floorRecord.length != 0){
      if((min <= floorRecord.length) && (floorRecord.length <= max)){
        return true;
      }
    }
    return false;
  }

  public async findAll(): Promise<Floor[]> {
      const floorsResult = await this.floorSchema.find();
      const floors = []
      if(floorsResult.length != 0){
        floorsResult.forEach((element) => {
          floors.push(FloorMap.toDomain(element));
        })
      }
      return floors;
  }
}