import { Repo } from "../../core/infra/Repo";
import { Room } from "../../domain/room";
import { RoomId } from "../../domain/roomId";

export default interface IRoomRepo extends Repo<Room> {
  save(room: Room): Promise<Room>;
  findByDomainId (roomId: RoomId | string): Promise<Room>;
  findAll():Promise<Array<Room>>;
  findByFloorId(floorId: string): Promise<Array<Room>>;
}