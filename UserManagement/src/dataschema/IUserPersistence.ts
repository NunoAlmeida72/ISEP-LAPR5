export interface IUserPersistence {
	domainId: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	phoneNumber: number;
	nif: number;
	salt: string;
	role: string;
	status: string;
	decisionDate?: Date;
	decisionUserId?: string;
	registrationDate?: Date;
  }