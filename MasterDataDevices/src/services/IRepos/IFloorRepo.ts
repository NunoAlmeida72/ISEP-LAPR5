import { Repo } from "../../core/infra/Repo";
import { Floor } from "../../domain/floor";
import { FloorId } from "../../domain/floorId";

export default interface IFloorRepo extends Repo<Floor> {
  save(floor: Floor): Promise<Floor>;
  findByDomainId(floorId: FloorId | string): Promise<Floor>;
  findByBuildingId(buildingId: string): Promise<Array<Floor>>;
  floorInLimit(buildingId: string, min : number, max : number): Promise<boolean>;
  findAll():Promise<Array<Floor>>;
}