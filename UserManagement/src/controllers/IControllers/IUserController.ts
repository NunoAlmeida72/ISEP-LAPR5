import { Request, Response, NextFunction } from 'express';

export default interface IUserController  {
  createUser(req: Request, res: Response, next: NextFunction);
  updateUser(req: Request, res: Response, next: NextFunction);
  signIn(req: Request, res: Response, next: NextFunction);
  signUp(req: Request, res: Response, next: NextFunction);
  getMe(req, res: Response, next: NextFunction);
  logout(req, res: Response, next: NextFunction);
  getUsers(req, res: Response, next: NextFunction);
  getUsersByRole(req: Request, res: Response, next: NextFunction);
  getUserById(req: Request, res: Response, next: NextFunction);
  getUsersRequest(req: Request, res: Response, next: NextFunction);
  acceptUser(req: Request, res: Response, next: NextFunction);
  rejectUser(req: Request, res: Response, next: NextFunction);
  deleteMe(req: Request, res: Response, next: NextFunction);
}