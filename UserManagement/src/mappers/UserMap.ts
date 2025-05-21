import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import {IUserDTO} from "../dto/IUserDTO";

import { User } from "../domain/user";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { UserEmail } from "../domain/userEmail";
import { UserPassword } from "../domain/userPassword";

import RoleRepo from "../repos/roleRepo";

export class UserMap extends Mapper<User> {

  public static toDTO( user: User): IUserDTO {
    return {
      id: user.id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email.value,
      password: "",
      phoneNumber: user.phoneNumber,
      nif: user.nif,
      role: user.role.name,
      status: user.status,
      decisionDate: user.decisionDate,
      decisionUserId: user.decisionUserId,
      registrationDate: user.registrationDate,
    } as IUserDTO;
  }

  public static async toDomain (raw: any): Promise<User> {
    const userEmailOrError = UserEmail.create(raw.email);
    const userPasswordOrError = UserPassword.create({value: raw.password, hashed: true});
    const repo = Container.get(RoleRepo);
    const role = await repo.findByDomainId(raw.role);

    const userOrError = User.create({
      firstName: raw.firstName,
      lastName: raw.lastName,
      email: userEmailOrError.getValue(),
      password: userPasswordOrError.getValue(),
      phoneNumber: raw.phoneNumber,
      nif: raw.nif,
      role: role,
      status: raw.status,
      decisionDate: raw.decisionDate,
      decisionUserId: raw.decisionUserId,
      registrationDate: raw.registrationDate,
    }, new UniqueEntityID(raw.domainId))

    userOrError.isFailure ? console.log(userOrError.error) : '';
    
    return userOrError.isSuccess ? userOrError.getValue() : null;
  }

  public static toPersistence (user: User): any {
    const a = {
      domainId: user.id.toString(),
      email: user.email.value,
      password: user.password.value,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      nif: user.nif,
      role: user.role.id.toValue(),
      status: user.status,
      decisionDate: user.decisionDate,
      decisionUserId: user.decisionUserId,
      registrationDate: user.registrationDate
    }
    return a;
  }
}