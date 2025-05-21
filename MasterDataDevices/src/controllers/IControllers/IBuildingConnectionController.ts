import { Request, Response, NextFunction } from 'express';

export default interface IBuildingConnectionController  {
  createBuildingConnection(req: Request, res: Response, next: NextFunction);
  listBuildingConnections(req: Request, res: Response, next: NextFunction);
  updateBuildingConnection(req: Request, res: Response, next: NextFunction);
  getBuildingConnectionsByFloorId(req: Request, res: Response, next: NextFunction);
}