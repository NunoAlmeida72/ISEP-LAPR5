import { Repo } from "../../core/infra/Repo";
import { Robot } from "../../domain/robot";
import { RobotId } from "../../domain/robotId";

export default interface IRobotRepo extends Repo<Robot> {
  save(robot: Robot): Promise<Robot>;
  findByDomainId (robotId: RobotId | string): Promise<Robot>;
  findAll():Promise<Array<Robot>>;
  findNames():Promise<Array<string>>;
  findByName(name: string):Promise<Array<Robot>>;
  findByRobotTypeId(id:string):Promise<Array<Robot>>;
}