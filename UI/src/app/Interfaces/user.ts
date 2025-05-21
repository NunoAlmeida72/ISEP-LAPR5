export interface User {
  token?(token: any): unknown;
  id?:string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: string;
  phoneNumber?:number;
  nif?:number;
  status?:string;
  decisionDate?: Date;
  decisionUserId?: string;
}
