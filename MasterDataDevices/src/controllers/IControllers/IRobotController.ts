import { Request, Response, NextFunction } from 'express';

export default interface IRobotController  {
  createRobot(req: Request, res: Response, next: NextFunction);
  disableRobot(req: Request, res: Response, next: NextFunction);
  listRobots(req: Request, res: Response, next: NextFunction);
  listRobotsByTaskOrDesignation(req: Request, res: Response, next: NextFunction);
  listRobotNames(req: Request, res: Response, next: NextFunction);
  listRobotsByRobotType(req: Request, res: Response, next: NextFunction);
}