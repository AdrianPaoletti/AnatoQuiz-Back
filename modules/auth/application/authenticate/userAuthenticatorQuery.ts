import { Query } from "../../../shared/domain/query";

export class UserAuthenticatorQuery implements Query {
  readonly password;
  readonly hashedPassword;
  readonly id;
  readonly google;

  constructor(password: string, hashedPassword: string, id: string, google: boolean) {
    this.password = password;
    this.hashedPassword = hashedPassword;
    this.id = id;
    this.google = google;
  }
}
