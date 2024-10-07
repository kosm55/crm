export interface IUser {
  _id: string;
  name: string;
  surname: string;
  email: string;
  isActive: boolean;
  isBanned: boolean;
  role: string;
}
export interface IUserRegister {
  name: string;
  surname: string;
  email: string;
}
export interface IUserActivate {
  _id: string;
  name: string;
  surname: string;
  email: string;
  isActive: boolean;
  isBanned: boolean;
  role: string;
  activationToken: string;
}
export interface IUserRecovery {
  _id: string;
  name: string;
  surname: string;
  email: string;
  isActive: boolean;
  isBanned: boolean;
  role: string;
  recoveryToken: string;
}

export interface IUserForOrder {
  name: string;
  surname: string;
}
