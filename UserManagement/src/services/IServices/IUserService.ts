import { Result } from "../../core/logic/Result";
import { IUserDTO } from "../../dto/IUserDTO";

export default interface IUserService  {
  SignUp(userDTO: IUserDTO): Promise<Result<{userDTO: IUserDTO}>>;
  SignIn(email: string, password: string): Promise<Result<{ userDTO: IUserDTO, token: string }>>;
  createUser(userDTO:IUserDTO):Promise<Result<IUserDTO>>;
  getUserById(userId: string): Promise<Result<IUserDTO>>;
  editUser(userDTO: IUserDTO): Promise<Result<IUserDTO>>;
  getAllUsers():Promise<Result<Array<IUserDTO>>>;
  getUsersByRole(role:string):Promise<Result<Array<IUserDTO>>>;
  getUsersRequests():Promise<Result<Array<IUserDTO>>>;
  acceptUser(userId:string, adminUserId:string):Promise<Result<IUserDTO>>;
  rejectUser(userId:string, adminUserId:string):Promise<Result<IUserDTO>>;
  deleteUser(userId: string): Promise<Result<IUserDTO>> 
}
