import { Query } from "../../../shared/domain/query";

export class UserAuthenticatorQuery implements Query {
  readonly password;
  readonly hashedPassword;
  readonly id;

  constructor(password: string, hashedPassword: string, id: string) {
    this.password = password;
    this.hashedPassword = hashedPassword;
    this.id = id;
  }
}
