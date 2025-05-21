import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { RobotTypeId } from "./robotTypeId";

import IRobotTypeDTO from "../dto/IRobotTypeDTO";

interface RobotTypeProps {
  type: string;
  brand: string;
  model: string;
  possibleTasks: string[];
}

export class RobotType extends AggregateRoot<RobotTypeProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get robotTypeId (): RobotTypeId {
    return new RobotTypeId(this.robotTypeId.toValue());
  }

  get type (): string {
    return this.props.type;
  }

  get brand (): string {
    return this.props.brand;
  }

  get model (): string {
    return this.props.model;
  }

  get possibleTasks (): string[] {
    return this.props.possibleTasks;
  }

  set type ( value: string) {
    this.props.type = value;
  }

  set brand ( value: string) {
    this.props.brand = value;
  }

  set model ( value: string) {
    this.props.model = value;
  }

  set possibleTasks ( value: string[]) {
    this.props.possibleTasks = value;
  }

  private constructor (props: RobotTypeProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (robotTypeDTO: IRobotTypeDTO, id?: UniqueEntityID): Result<RobotType> {

    if (!!robotTypeDTO.type === false || robotTypeDTO.type.length === 0 ||  robotTypeDTO.type.length>25) {
      return Result.fail<RobotType>('Must provide a Robot Type type (max 25 characters)')
    }else  if(!!robotTypeDTO.brand ===false|| robotTypeDTO.brand.length===0||robotTypeDTO.brand.length>50){
      return Result.fail<RobotType>('Must provide a Robot Type brand (max 50 characters)')
    }else  if(!!robotTypeDTO.model ===false|| robotTypeDTO.model.length===0||robotTypeDTO.model.length>100){
      return Result.fail<RobotType>('Must provide a Robot Type model (max 100 characters)')
    }else if(robotTypeDTO.possibleTasks.length===0){
      return Result.fail<RobotType>('Must provide the Robot Type possible tasks')
    } else {
      const robotType = new RobotType({ type: robotTypeDTO.type,model:robotTypeDTO.model,brand:robotTypeDTO.brand,possibleTasks:robotTypeDTO.possibleTasks }, id);
      return Result.ok<RobotType>( robotType );
    }
  }
}
