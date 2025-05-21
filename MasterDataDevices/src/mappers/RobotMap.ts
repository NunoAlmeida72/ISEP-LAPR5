import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IBuildingPersistence } from '../dataschema/IBuildingPersistence';

import IRobotDTO from "../dto/IRobotDTO";
import { Robot } from "../domain/robot";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class RobotMap extends Mapper<Robot> {
  
  public static toDTO( robot: Robot): IRobotDTO {
    return {
      id: robot.id.toString(),
      name: robot.name,
      code: robot.code,
      robotTypeId: robot.robotTypeId,
      number: robot.number,
      status: robot.status,
      description: robot.description,
    } as IRobotDTO;
  }

  public static toDomain (robot: any | Model<IBuildingPersistence & Document> ): Robot {
    const robotOrError = Robot.create(
        robot,
      new UniqueEntityID(robot.domainId)
    );

    robotOrError.isFailure ? console.log(robotOrError.error) : '';

    return robotOrError.isSuccess ? robotOrError.getValue() : null;
  }

  public static toPersistence (robot: Robot): any {
    return {
      domainId: robot.id.toString(),
      name: robot.name,
      code: robot.code,
      robotTypeId: robot.robotTypeId,
      number: robot.number,
      status: robot.status,
      description: robot.description,
    }
  }
}