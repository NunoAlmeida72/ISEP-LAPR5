import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { UserId } from "./userId";
import { UserEmail } from "./userEmail";
import { Role } from "../domain/role";
import { UserPassword } from "./userPassword";
import { Guard } from "../core/logic/Guard";
import { Status } from "./status";


interface UserProps {
  firstName: string;
  lastName: string;
  email: UserEmail;
  password: UserPassword;
  phoneNumber: number;
  nif?: number;
  role: Role;
  status: Status;
  decisionDate?: Date;
  decisionUserId?: string;
  registrationDate?: Date;
}

export class User extends AggregateRoot<UserProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get userId (): UserId {
    return UserId.caller(this.id)
  }

  get email (): UserEmail {
    return this.props.email;
  }

  get firstName (): string {
    return this.props.firstName
  }

  get lastName (): string {
    return this.props.lastName;
  }

  get password (): UserPassword {
    return this.props.password;
  }

  get phoneNumber (): number {
    return this.props.phoneNumber;
  }

  get nif (): number {
    return this.props.nif;
  }

  get role (): Role {
    return this.props.role;
  }

  get status (): Status {
    return this.props.status;
  }

  get decisionDate(): Date | undefined {
    return this.props.decisionDate;
  }

  get decisionUserId(): string | undefined {
    return this.props.decisionUserId;
  }

  get registrationDate(): Date | undefined {
    return this.props.registrationDate;
  }

  set firstName (value: string) {
    this.props.firstName = value;
  }

  set lastName (value: string) {
    this.props.lastName = value;
  }

  set email (value: UserEmail) {
    this.props.email = value;
  }

  set password (value: UserPassword) {
    this.props.password = value;
  }

  set phoneNumber (value: number) {
    this.props.phoneNumber = value;
  }

  set nif (value: number) {
    this.props.nif = value;
  }
  
  set role (value: Role) {
      this.props.role = value;
  }

  set status (value: Status) {
    this.props.status = value;
  }

  set decisionDate(value: Date | undefined) {
    this.props.decisionDate = value;
  }

  set decisionUserId(value: string | undefined) {
    this.props.decisionUserId = value;
  }

  set registrationDate(value: Date | undefined) {
    this.props.registrationDate = value;
  }

  private constructor (props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: UserProps, id?: UniqueEntityID): Result<User> {
    let guardedProps=[];
    if(!props.nif){
      guardedProps = [
        { argument: props.firstName, argumentName: 'firstName' },
        { argument: props.lastName, argumentName: 'lastName' },
        { argument: props.email, argumentName: 'email' },
        { argument: props.phoneNumber, argumentName: 'phoneNumber' },
        { argument: props.role, argumentName: 'role' },
        { argument: props.status, argumentName: 'status' },
      ];
    }else{
      guardedProps = [
        { argument: props.firstName, argumentName: 'firstName' },
        { argument: props.lastName, argumentName: 'lastName' },
        { argument: props.email, argumentName: 'email' },
        { argument: props.phoneNumber, argumentName: 'phoneNumber' },
        { argument: props.nif, argumentName: 'nif' },
        { argument: props.role, argumentName: 'role' },
        { argument: props.status, argumentName: 'status' },
      ];
    }


    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);


    if (!guardResult.succeeded) {
      return Result.fail<User>(guardResult.message)
    }     
    else {
      const user = new User({
        ...props
      }, id);

      return Result.ok<User>(user);
    }
  }
}