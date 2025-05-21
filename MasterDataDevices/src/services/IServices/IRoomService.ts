import { Result } from "../../core/logic/Result";
import IRoomDTO from "../../dto/IRoomDTO";

export default interface IRoomService  {
  createRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>>;
  listRoomsByFloorId(floorId:string): Promise<Result<Array<IRoomDTO>>>;
  listRooms(): Promise<Result<Array<IRoomDTO>>>;
}
