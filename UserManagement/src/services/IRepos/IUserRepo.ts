import { Repo } from "../../core/infra/Repo";
import { Role } from "../../domain/role";
import { Status } from "../../domain/status";
import { User } from "../../domain/user";
import { UserEmail } from "../../domain/userEmail";

export default interface IUserRepo extends Repo<User> {
	save(user: User): Promise<User>;
	findAll():Promise<Array<User>>;
	findByEmail (email: UserEmail | string): Promise<User>;
	findById (id: string): Promise<User>;
	findByPhoneNumber(phoneNumber: number): Promise<User>;
	findByNif(nif: number): Promise<User>;
	findAllByRole(role:Role):Promise<Array<User>>;
	findByStatus(status:Status):Promise<Array<User>>;
	deleteUser(id: string): Promise<User>;
}
  