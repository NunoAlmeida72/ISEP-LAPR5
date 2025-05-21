import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IBuildingConnectionPersistence } from '../dataschema/IBuildingConnectionPersistence';

import IBuildingConnectionDTO from "../dto/IBuildingConnectionDTO";
import { BuildingConnection } from "../domain/buildingConnection";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class BuildingConnectionMap extends Mapper<BuildingConnection> {
  
  public static toDTO( buildingConnection: BuildingConnection): IBuildingConnectionDTO {
    return {
      id: buildingConnection.id.toString(),
      floor1Id: buildingConnection.floor1Id,
      floor2Id: buildingConnection.floor2Id,
      posXFloor1: buildingConnection.posXFloor1,
      posXFloor2: buildingConnection.posXFloor2,
      posYFloor1: buildingConnection.posYFloor1,
      posYFloor2: buildingConnection.posYFloor2,
    } as IBuildingConnectionDTO;
  }

  public static toDomain (buildingConnection: any | Model<IBuildingConnectionPersistence & Document> ): BuildingConnection {
    const buildingConnectionOrError = BuildingConnection.create(
      buildingConnection,
      new UniqueEntityID(buildingConnection.domainId)
    );

    buildingConnectionOrError.isFailure ? console.log(buildingConnectionOrError.error) : '';

    return buildingConnectionOrError.isSuccess ? buildingConnectionOrError.getValue() : null;
  }

  public static toPersistence (buildingConnection: BuildingConnection): any {
    return {
      domainId: buildingConnection.id.toString(),
      floor1Id: buildingConnection.floor1Id,
      floor2Id: buildingConnection.floor2Id,
      posXFloor1: buildingConnection.posXFloor1,
      posXFloor2: buildingConnection.posXFloor2,
      posYFloor1: buildingConnection.posYFloor1,
      posYFloor2: buildingConnection.posYFloor2,
    }
  }
}