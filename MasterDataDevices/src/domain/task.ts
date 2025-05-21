import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { TaskId } from "./taskId";

import ITaskDTO from "../dto/ITaskDTO";

interface TaskProps {
  name: string;
}

export class Task extends AggregateRoot<TaskProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get roleId (): TaskId {
    return new TaskId(this.roleId.toValue());
  }

  get name (): string {
    return this.props.name;
  }

  set name ( value: string) {
    this.props.name = value;
  }
  private constructor (props: TaskProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (roleDTO: ITaskDTO, id?: UniqueEntityID): Result<Task> {
    const name = roleDTO.name;

    if (!!name === false || name.length === 0) {
      return Result.fail<Task>('Must provide a role name')
    } else {
      const task = new Task({ name: name }, id);
      return Result.ok<Task>( task )
    }
  }
}
