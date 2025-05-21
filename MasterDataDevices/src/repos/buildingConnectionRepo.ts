import { Service, Inject } from 'typedi';

import IBuildingConnectionRepo from "../services/IRepos/IBuildingConnectionRepo";
import { BuildingConnection } from "../domain/buildingConnection";
import { BuildingConnectionId } from "../domain/buildingConnectionId";
import { BuildingConnectionMap } from "../mappers/BuildingConnectionMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IBuildingConnectionPersistence } from '../dataschema/IBuildingConnectionPersistence';
import { FloorId } from '../domain/floorId';

@Service()
export default class BuildingConnectionRepo implements IBuildingConnectionRepo {
  private models: any;

  constructor(
    @Inject('buildingConnectionSchema') private buildingConnectionSchema : Model<IBuildingConnectionPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(buildingConnection: BuildingConnection): Promise<boolean> {
    
    const idX = buildingConnection.id instanceof BuildingConnectionId ? (<BuildingConnectionId>buildingConnection.id).toValue() : buildingConnection.id;

    const query = { domainId: idX}; 
    const buildingConnectionDocument = await this.buildingConnectionSchema.findOne( query as FilterQuery<IBuildingConnectionPersistence & Document>);

    return !!buildingConnectionDocument === true;
  }

  public async save (buildingConnection: BuildingConnection): Promise<BuildingConnection> {
    const query = { domainId: buildingConnection.id.toString()}; 

    const buildingConnectionDocument = await this.buildingConnectionSchema.findOne( query );

    try {
      if (buildingConnectionDocument === null ) {
        const rawBuildingConnection: any = BuildingConnectionMap.toPersistence(buildingConnection);

        const buildingConnectionCreated = await this.buildingConnectionSchema.create(rawBuildingConnection);

        return BuildingConnectionMap.toDomain(buildingConnectionCreated);
      } else {
        buildingConnectionDocument.floor1Id = buildingConnection.floor1Id;
        buildingConnectionDocument.floor2Id = buildingConnection.floor2Id;
        buildingConnectionDocument.posXFloor1 = buildingConnection.posXFloor1;
        buildingConnectionDocument.posYFloor1 = buildingConnection.posYFloor1;
        buildingConnectionDocument.posXFloor2 = buildingConnection.posXFloor2;
        buildingConnectionDocument.posYFloor2 = buildingConnection.posYFloor2;
        await buildingConnectionDocument.save();

        return buildingConnection;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (buildingConnectionId: BuildingConnectionId | string): Promise<BuildingConnection> {
    const query = { domainId: buildingConnectionId};
    const buildingConnectionRecord = await this.buildingConnectionSchema.findOne( query as FilterQuery<IBuildingConnectionPersistence & Document> );

    if( buildingConnectionRecord != null) {
      return BuildingConnectionMap.toDomain(buildingConnectionRecord);
    }
    else
      return null;
  }

  public async findByFloorId (floorId: FloorId | string): Promise<BuildingConnection[]> {
    const buildingConnectionResult = await this.buildingConnectionSchema.find();

    const buildingConnections = [];

    if( buildingConnectionResult.length != 0) {
      buildingConnectionResult.forEach((element) => {
        if(element.floor1Id == floorId || element.floor2Id == floorId){
          buildingConnections.push(BuildingConnectionMap.toDomain(element));
        }
      })
    }
    return buildingConnections;
  }

  public async findAll(): Promise<BuildingConnection[]> {
      const buildingConnectionResult = await this.buildingConnectionSchema.find();
      const buildingConnections = []
      if(buildingConnectionResult.length != 0){
        buildingConnectionResult.forEach((element) => {
          buildingConnections.push(BuildingConnectionMap.toDomain(element));
        })
      }
      return buildingConnections;
  }

  public async checkConnection(floor1: string, floor2: string): Promise<boolean> {
    let query = { floor1Id: floor1, floor2Id: floor2};
    let buildingConnectionResult = await this.buildingConnectionSchema.findOne(query as FilterQuery<IBuildingConnectionPersistence & Document>);
    if( buildingConnectionResult == null) {
      query = { floor1Id: floor2, floor2Id: floor1};
      buildingConnectionResult = await this.buildingConnectionSchema.findOne(query as FilterQuery<IBuildingConnectionPersistence & Document>);
      if (buildingConnectionResult == null) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
}