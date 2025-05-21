import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { FloorId } from "./floorId";

import IFloorDTO from "../dto/IFloorDTO";

interface FloorProps {
  buildingId: string;
  number: number;
  description: string;
  map:number[][];
  initialPosition: number[];
  initialDirection: number;
}

export class Floor extends AggregateRoot<FloorProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get floorId (): FloorId {
    return new FloorId(this.floorId.toValue());
  }

  get buildingId (): string {
    return this.props.buildingId;
  }

  get number (): number{
    return this.props.number;
  }

  get description (): string{
    return this.props.description;
  }

  get map ():number[][]{
    return  this.props.map;
  }

  get initialPosition (): number[]{
    return this.props.initialPosition;
  }

  get initialDirection (): number{
    return this.props.initialDirection;
  }

  set buildingId ( value: string) {
    this.props.buildingId = value;
  }

  set number ( value: number) {
    this.props.number = value;
  }

  set description ( value: string) {
    this.props.description = value;
  }

  set  map(value : number [][]){
    this.props.map=value;
  }

  set initialPosition ( value: number[]) {
    this.props.initialPosition=value;
  }

  set initialDirection ( value: number) {
    this.props.initialDirection=value;
  }

  private constructor (props: FloorProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (floorDTO: IFloorDTO, id?: UniqueEntityID): Result<Floor> {

    if (floorDTO.number==null) {
      return Result.fail<Floor>('Must provide a floor number');
    }else if(floorDTO.description.length > 250){
      return Result.fail<Floor>('Floor description cannot be longer than 250 characters');
    }else if(!!floorDTO.buildingId === false ){
      return Result.fail<Floor>('Must provide the buildingId that the floor is in');
    } else {
      const floor = new Floor({ buildingId: floorDTO.buildingId,number: floorDTO.number,description:floorDTO.description,map: floorDTO.map , initialPosition: floorDTO.initialPosition, initialDirection: floorDTO.initialDirection}, id);
      return Result.ok<Floor>( floor )
    }
  }
}
