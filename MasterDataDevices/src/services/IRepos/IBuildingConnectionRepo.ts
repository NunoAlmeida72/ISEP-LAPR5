import { Repo } from "../../core/infra/Repo";
import { BuildingConnection } from "../../domain/buildingConnection";
import { BuildingConnectionId } from "../../domain/buildingConnectionId";
import { FloorId } from "../../domain/floorId";

export default interface IBuildingConnectionRepo extends Repo<BuildingConnection> {
  save(buildingConnection: BuildingConnection): Promise<BuildingConnection>;
  findByDomainId (buildingConnectionId: BuildingConnectionId | string): Promise<BuildingConnection>;
  findAll():Promise<Array<BuildingConnection>>;
  checkConnection(floor1: string, floor2: string): Promise<boolean>;
  findByFloorId(floorId: FloorId | string): Promise<BuildingConnection[]>;
}