import { Repo } from "../../core/infra/Repo";
import { Task } from "../../domain/task";
import { TaskId } from "../../domain/taskId";

export default interface ITaskRepo extends Repo<Task> {
  save(task: Task): Promise<Task>;
  findByDomainId (taskId: TaskId | string): Promise<Task>;
  findAll():Promise<Task[]>;
}