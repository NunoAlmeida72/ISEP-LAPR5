import { Result } from "../../core/logic/Result";
import IBuildingConnectionDTO from "../../dto/IBuildingConnectionDTO";
import IElevatorDTO from "../../dto/IElevatorDTO";
import IFloorDTO from "../../dto/IFloorDTO";
import IMapDTO from "../../dto/IMapDTO";
import IRoomDTO from "../../dto/IRoomDTO";

export default interface IFloorService  {
  createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
  loadMap(floorId: string,map: number[][], initialPosition: number[], initialDirection: number,roomsDTO: IRoomDTO[],elevatorsDTO: IElevatorDTO[],buildingConnectionsDTO: IBuildingConnectionDTO[]) : Promise<Result<IFloorDTO>>;
  listFloors(buildingId: string): Promise<Result<Array<IFloorDTO>>>;
  listFloorsWithBuildingConnections(buildingId: string): Promise<Result<Array<IFloorDTO>>>;
  updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
  listFloorsWithElevator(buildingId: string): Promise<Result<Array<IFloorDTO>>>;
  getAllFloorsMap(): Promise<Result<Array<IMapDTO>>>;
}
