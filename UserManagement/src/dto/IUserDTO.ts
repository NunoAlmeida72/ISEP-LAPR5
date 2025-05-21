
export interface IUserDTO {
  id:string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: number;
  nif: number;
  role: string;
  status: string;
  decisionDate?: Date;
  decisionUserId?: string;
  registrationDate?: Date;
}
