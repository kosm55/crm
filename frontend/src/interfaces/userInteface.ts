export interface IUser {
  id: string;
  name: string;
  surname: string;
  email: string;
  isActive: boolean;
  isBanned: boolean;
}
export interface IActivateUser {
  id: string;
  name: string;
  surname: string;
  email: string;
  isActive: boolean;
  isBanned: boolean;
  activationToken: string;
}
