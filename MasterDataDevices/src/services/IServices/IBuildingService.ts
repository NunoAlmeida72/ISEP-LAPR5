import { Result } from "../../core/logic/Result";
import IBuildingDTO from "../../dto/IBuildingDTO";

export default interface IBuildingService  {
  createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>;
  listBuildings(): Promise<Result<Array<IBuildingDTO>>>;
  listBuildingsInFloorLimit(min: number, max: number): Promise<Result<Array<IBuildingDTO>>>;
  updateBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>;
}
