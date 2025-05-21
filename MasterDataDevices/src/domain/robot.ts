import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { RobotId } from "./robotId";

import IRobotDTO from "../dto/IRobotDTO";

interface RobotProps {
  code: string;
  name: string;
  robotTypeId: string;
  number: string;
  status: boolean;
  description: string;
}

export class Robot extends AggregateRoot<RobotProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get robotId (): RobotId {
    return new RobotId(this.robotId.toValue());
  }

  get name (): string {
    return this.props.name;
  }

  get code (): string {
    return this.props.code;
  }

  get robotTypeId (): string {
    return this.props.robotTypeId;
  }

  get number (): string {
    return this.props.number;
  }

  get status (): boolean {
    return this.props.status;
  }

  get description (): string{
    return this.props.description;
  }

  set name ( value: string) {
    this.props.name = value;
  }

  set code ( value: string) {
    this.props.code = value;
  }

  set robotTypeId ( value: string) {
    this.props.robotTypeId = value;
  }

  set number ( value: string) {
    this.props.number = value;
  }

  set status ( value: boolean) {
    this.props.status = value;
  }

  set description ( value: string) {
    this.props.description = value;
  }

  private constructor (props: RobotProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (robotDTO: IRobotDTO, id?: UniqueEntityID): Result<Robot> {

    if (!!robotDTO.code === false || robotDTO.code.length > 30) {
      return Result.fail<Robot>('Must provide a robot code(max 30 characters)');
    }else if(!!robotDTO.name === false || robotDTO.name.length > 30){
      return Result.fail<Robot>('Must provide a robot name(max 30 characters)');
    }else if(!!robotDTO.number === false || robotDTO.number.length > 50){
      return Result.fail<Robot>('Must provide a robot serial number(max 50 characters)');
    }else if (!!robotDTO.description === true && robotDTO.description.length > 250) {
      return Result.fail<Robot>('Robot description has a maximum of 250 characters');
    }else {
      const robot = new Robot({ code: robotDTO.code, name: robotDTO.name, robotTypeId: robotDTO.robotTypeId, number: robotDTO.number, status: robotDTO.status, description: robotDTO.description }, id);
      return Result.ok<Robot>( robot )
    }
  }
}
