import { Service, Inject } from 'typedi';
import config from "../../config";
import ITaskDTO from '../dto/ITaskDTO';
import { Task } from "../domain/task";
import ITaskRepo from '../services/IRepos/ITaskRepo';
import ITaskService from './IServices/ITaskService';
import { Result } from "../core/logic/Result";
import { TaskMap } from "../mappers/TaskMap";

@Service()
export default class TaskService implements ITaskService {
  constructor(
      @Inject(config.repos.task.name) private taskRepo : ITaskRepo
  ) {}

  public async getTask( taskId: string): Promise<Result<ITaskDTO>> {
    try {
      const role = await this.taskRepo.findByDomainId(taskId);

      if (role === null) {
        return Result.fail<ITaskDTO>({"error":"Task not found"});
      }
      else {
        const taskDTOResult = TaskMap.toDTO( role ) as ITaskDTO;
        return Result.ok<ITaskDTO>( taskDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }


  public async createTask(taskDTO: ITaskDTO): Promise<Result<ITaskDTO>> {
    try {

      const taskOrError = Task.create( taskDTO );

      if (taskOrError.isFailure) {
        return Result.fail<ITaskDTO>({"error":taskOrError.errorValue()});
      }

      const taskResult = taskOrError.getValue();

      await this.taskRepo.save(taskResult);

      const taskDTOResult = TaskMap.toDTO( taskResult ) as ITaskDTO;
      return Result.ok<ITaskDTO>( taskDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async getTasks(): Promise<Result<ITaskDTO[]>> {
    try {
      const tasks = await this.taskRepo.findAll();

      const tasksDTO=[]

      if (tasks === null) {
        return Result.fail<ITaskDTO[]>({"error":"Tasks not found"});
      }
      else {
        for (let i = 0; i < tasks.length; i++) {
          tasksDTO.push(TaskMap.toDTO(tasks[i]));
        }
        
      }
      return Result.ok<ITaskDTO[]>( tasksDTO )
    } catch (e) {
      throw e;
    }
  }

}
