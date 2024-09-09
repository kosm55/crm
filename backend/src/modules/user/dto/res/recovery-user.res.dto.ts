export class RecoveryUserResDto {
  _id: string;

  name: string;

  surname: string;

  email: string;

  isActive: boolean;

  isBanned: boolean;

  recoveryToken: string;
}
