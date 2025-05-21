import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { BuildingConnectionId } from "./buildingConnectionId";

import IBuildingConnectionDTO from "../dto/IBuildingConnectionDTO";

interface BuildingConnectionProps {
  floor1Id: string;
  floor2Id: string;
  posXFloor1: number;
  posYFloor1: number;
  posXFloor2: number;
  posYFloor2: number;
}

export class BuildingConnection extends AggregateRoot<BuildingConnectionProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get buildingConnectionId (): BuildingConnectionId {
    return new BuildingConnectionId(this.buildingConnectionId.toValue());
  }

  get floor1Id (): string {
    return this.props.floor1Id;
  }

  get floor2Id (): string {
    return this.props.floor2Id;
  }

  get posXFloor1():number{
    return this.props.posXFloor1; 
  }

  get posYFloor1():number{
    return this.props.posYFloor1;
  }
  get posXFloor2():number{
    return this.props.posXFloor2; 
  }

  get posYFloor2():number{
    return this.props.posYFloor2;
  }

  set floor1Id ( value: string) {
    this.props.floor1Id = value;
  }

  set floor2Id ( value: string) {
    this.props.floor2Id = value;
  }

  set  posXFloor1(value:number){
    this.props.posXFloor1=value;
    }

  set  posYFloor1(value:number){
    this.props.posYFloor1=value;
  }

  set  posXFloor2(value:number){
    this.props.posXFloor2=value;
    }

  set  posYFloor2(value:number){
    this.props.posYFloor2=value;
  }

  private constructor (props: BuildingConnectionProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (buildingConnectionDTO: IBuildingConnectionDTO, id?: UniqueEntityID): Result<BuildingConnection> {

    if (!!buildingConnectionDTO.floor1Id === false || !!buildingConnectionDTO.floor2Id === false) {
        return Result.fail<BuildingConnection>('Must provide a floor id');
    }else {
      const buildingConnection = new BuildingConnection({ floor1Id: buildingConnectionDTO.floor1Id, floor2Id: buildingConnectionDTO.floor2Id,posXFloor2:buildingConnectionDTO.posXFloor2,posYFloor2:buildingConnectionDTO.posYFloor2,posXFloor1:buildingConnectionDTO.posXFloor1,posYFloor1:buildingConnectionDTO.posYFloor1},id);
      return Result.ok<BuildingConnection>( buildingConnection )
    }
  }
}
