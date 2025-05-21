import { Request, Response, NextFunction } from 'express';

export default interface IBuildingController  {
  createBuilding(req: Request, res: Response, next: NextFunction);
  listBuildings(req: Request, res: Response, next: NextFunction);
  listBuildingsInFloorLimit(req: Request, res: Response, next: NextFunction);
  updateBuilding(req: Request, res: Response, next: NextFunction);
}