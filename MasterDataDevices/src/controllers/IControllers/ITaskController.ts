import { Request, Response, NextFunction } from 'express';

export default interface ITaskController  {
  createTask(req: Request, res: Response, next: NextFunction);
  getTasks(req: Request, res: Response, next: NextFunction);
  getTask(req: Request, res: Response, next: NextFunction);
}