import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import ITaskController from "./IControllers/ITaskController";
import ITaskService from '../services/IServices/ITaskService';
import ITaskDTO from '../dto/ITaskDTO';

import { Result } from "../core/logic/Result";
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Service()
export default class TaskController implements ITaskController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.task.name) private taskServiceInstance : ITaskService
  ) {}

  public async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      const taskOrError = await this.taskServiceInstance.createTask(req.body as ITaskDTO) as Result<ITaskDTO>;
        
      if (taskOrError.isFailure) {
        return res.status(402).json(taskOrError.errorValue()).send();
      }

      const taskDTO = taskOrError.getValue();
      return res.json( taskDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };
  
  public async getTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const taskOrError = await this.taskServiceInstance.getTasks() as Result<ITaskDTO[]>;

      if (taskOrError.isFailure) {
        return res.status(404).json(taskOrError.errorValue()).send();
      }

      const taskDTO = taskOrError.getValue();
      return res.status(201).json( taskDTO );
    }
    catch (e) {
      return next(e);
    }
  }

  public async getTask(req: Request, res: Response, next: NextFunction) {
    try {
      let aux=req.params.id;
      const taskOrError = await this.taskServiceInstance.getTask(aux) as Result<ITaskDTO>;

      if (taskOrError.isFailure) {
        return res.status(404).json(taskOrError.errorValue()).send();
      }

      const taskDTO = taskOrError.getValue();
      return res.status(201).json( taskDTO );
    }
    catch (e) {
      return next(e);
    }
  }

}