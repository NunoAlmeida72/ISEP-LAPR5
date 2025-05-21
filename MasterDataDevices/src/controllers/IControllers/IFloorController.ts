import { Request, Response, NextFunction } from 'express';

export default interface IFloorController  {
  createFloor(req: Request, res: Response, next: NextFunction);
  loadMap(req: Request, res: Response, next: NextFunction);
  listFloors(req: Request, res: Response, next: NextFunction);
  listFloorsWithBuildingConnections(req: Request, res: Response, next: NextFunction);
  listFloorsWithElevator(req: Request, res: Response, next: NextFunction);
  updateFloor(req: Request, res: Response, next: NextFunction);
  getAllFloorsMap(req: Request, res: Response, next: NextFunction);
}