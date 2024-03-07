import { Query } from "../../../shared/domain/query";

export class UserAuthorizatorQuery implements Query {
  readonly token;

  constructor(token: string) {
    this.token = token;
  }
}
