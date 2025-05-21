import { Service, Inject } from 'typedi';
import config from "../../config";
import IRobotTypeDTO from '../dto/IRobotTypeDTO';
import { RobotType } from "../domain/robotType";
import IRobotTypeRepo from '../services/IRepos/IRobotTypeRepo';
import IRobotTypeService from './IServices/IRobotTypeService';
import { Result } from "../core/logic/Result";
import { RobotTypeMap } from "../mappers/RobotTypeMap";
import ITaskRepo from './IRepos/ITaskRepo';

@Service()
export default class RobotTypeService implements IRobotTypeService {
  constructor(
      @Inject(config.repos.robotType.name) private robotTypeRepo : IRobotTypeRepo,
      @Inject(config.repos.task.name) private taskRepo : ITaskRepo
  ) {}


  public async createRobotType(robotTypeDTO: IRobotTypeDTO): Promise<Result<IRobotTypeDTO>> {
    try {

      const tasksIds=[]

      for (let i = 0; i < robotTypeDTO.possibleTasks.length; i++) {
        const taskResult=await this.taskRepo.findByDomainId(robotTypeDTO.possibleTasks[i]);
        if(taskResult == null){
          return Result.fail<IRobotTypeDTO>({"error": "Must provide valid tasks"});
        }else{
          tasksIds.push(taskResult.id);
        }
      }

      const robotTypeOrError = await RobotType.create( robotTypeDTO );

      if (robotTypeOrError.isFailure) {
        return Result.fail<IRobotTypeDTO>({"error":robotTypeOrError.errorValue()});
      }

      const robotTypeResult = robotTypeOrError.getValue();

      await this.robotTypeRepo.save(robotTypeResult);

      const robotTypeDTOResult = RobotTypeMap.toDTO( robotTypeResult ) as IRobotTypeDTO;
      return Result.ok<IRobotTypeDTO>( robotTypeDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async listAllRobotTypes(): Promise<Result<IRobotTypeDTO[]>> {

    try{

      const robotTypeResult = await this.robotTypeRepo.findAll();

      const robotTypes=[];

      if(robotTypeResult.length != 0){
        robotTypeResult.forEach((element) => {
          robotTypes.push(RobotTypeMap.toDTO(element));
        })
      }

      return Result.ok<IRobotTypeDTO[]>( robotTypes );

    } catch (e) {
      throw e;
    }
  }

}
