import { Result } from "../../core/logic/Result";
import ITaskDTO from "../../dto/ITaskDTO";

export default interface ITaskService  {
  createTask(taskDTO: ITaskDTO): Promise<Result<ITaskDTO>>;
  getTasks(): Promise<Result<ITaskDTO[]>>;
  getTask (taskId: string): Promise<Result<ITaskDTO>>;
}
