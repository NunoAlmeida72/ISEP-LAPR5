import { Result } from "../../core/logic/Result";
import IBuildingConnectionDTO from "../../dto/IBuildingConnectionDTO";
import IBuildingDTO from "../../dto/IBuildingDTO";

export default interface IBuildingConnectionService  {
  createBuildingConnection(buildingConnectionDTO: IBuildingConnectionDTO): Promise<Result<IBuildingConnectionDTO>>;
  listBuildingConnections(buildingId1: string, buildingId2: string): Promise<Result<Array<IBuildingConnectionDTO>>>;
  updateBuildingConnection(buildingConnectionDTO: IBuildingConnectionDTO): Promise<Result<IBuildingConnectionDTO>>;
  getBuildingConnectionsByFloorId(floorId:string):Promise<Result<Array<IBuildingConnectionDTO>>>;
}
