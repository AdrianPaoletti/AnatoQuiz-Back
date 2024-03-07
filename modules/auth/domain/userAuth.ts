import { AggregateRoot } from "../../shared/domain/aggregateRoot";
import { UserId } from "../../shared/domain/user/userId";

import { UserAuthPrimitives } from "./userAuthPrimitives.interface";
import { UserAuthToken } from "./userAuthToken";

export class UserAuth extends AggregateRoot {
  public readonly token: UserAuthToken;
  public readonly id: UserId;

  constructor(token: UserAuthToken, id: UserId) {
    super();
    this.token = token;
    this.id = id;
  }

  static create(token: UserAuthToken, id: UserId): UserAuth {
    const userAuth = new UserAuth(token, id);

    return userAuth;
  }

  static fromPrimitives({ token, id }: UserAuthPrimitives): UserAuth {
    return new UserAuth(new UserAuthToken(token), new UserId(id));
  }

  public toPrimitives(): UserAuthPrimitives {
    return {
      token: this.token.value,
      id: this.id.value,
    };
  }
}
