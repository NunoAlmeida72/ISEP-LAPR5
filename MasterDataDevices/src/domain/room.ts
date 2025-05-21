import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { RoomId } from "./roomId";

import IRoomDTO from "../dto/IRoomDTO";

interface RoomProps {
  floorId: string;
  name: string;
  category: string;
  description: string;
  posX: number;
  posY: number;
  width: number;
  height: number;
  doorPosX: number;
  doorPosY: number;
}

export class Room extends AggregateRoot<RoomProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get roomId (): RoomId {
    return new RoomId(this.roomId.toValue());
  }

  get floorId (): string {
    return this.props.floorId;
  }

  get name (): string {
    return this.props.name;
  }

  get category (): string{
    return this.props.category;
  }

  get description (): string{
    return this.props.description;
  }

  get posX():number{
    return this.props.posX; 
  }

  get posY():number{
    return this.props.posY;
  }

  get width():number{
    return this.props.width;
  }

  get height():number{
    return this.props.height;
  }

  get doorPosX():number{
    return  this.props.doorPosX;
  }

  get doorPosY():number{
    return  this.props.doorPosY;
  }

  set floorId ( value: string) {
    this.props.floorId = value;
  }

  set name ( value: string) {
    this.props.name = value;
  }

  set category ( value: string) {
    this.props.category = value;
  }

  set description ( value: string) {
    this.props.description = value;
  }

  set  posX(value:number){
    this.props.posX=value;
    }

  set  posY(value:number){
    this.props.posY=value;
  }

  set  width(value:number){
    this.props.width=value;
  }

  set  height(value:number){
    this.props.height=value;
  }

  set doorPosX(value:number){
    this.props.doorPosX=value
  }

  set doorPosY(value:number){
    this.props.doorPosY=value
  }

  private constructor (props: RoomProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (roomDTO: IRoomDTO, id?: UniqueEntityID): Result<Room> {

    if (!!roomDTO.floorId === false) {
      return Result.fail<Room>('Must provide a floor id')
    }else if (!!roomDTO.category === false) {
      return Result.fail<Room>('Must provide a room category');
    }else if(!!roomDTO.description === false){
      return Result.fail<Room>('Must provide a room description');
    }else if(roomDTO.name.length > 4){
      return Result.fail<Room>('Room name cant have more than 4 characters');
    }else {
      const room = new Room({floorId: roomDTO.floorId, name: roomDTO.name, category: roomDTO.category, description:roomDTO.description,posX: roomDTO.posX,posY: roomDTO.posY,height:roomDTO.height,width:roomDTO.width,doorPosX:roomDTO.doorPosX,doorPosY:roomDTO.doorPosY}, id);
      return Result.ok<Room>( room );
    }
  }
}
