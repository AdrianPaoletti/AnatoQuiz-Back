import { inject, injectable } from "inversify";

import { USERSAUTH_INJECTIONS_TYPES } from "../../../../dependencyInjection/usersAuth/usersAuth.types";
import { Query } from "../../../shared/domain/query";
import { QueryHandler } from "../../../shared/domain/queryHandler.interface";
import { UserId } from "../../../shared/domain/user/userId";
import { UserPassword } from "../../../shared/domain/user/userPassword";
import { UserAuthResponse } from "../userAuthResponse";

import { UserAuthenticator } from "./userAuthenticator";
import { UserAuthenticatorQuery } from "./userAuthenticatorQuery";

@injectable()
export class UserAuthenticatorQueryHandler
  implements QueryHandler<UserAuthenticatorQuery, UserAuthResponse>
{
  constructor(
    @inject(USERSAUTH_INJECTIONS_TYPES.UserAuthenticator)
    private readonly userAuthenticator: UserAuthenticator,
  ) {}

  subscribedTo(): Query {
    return UserAuthenticatorQuery;
  }

  async handle(query: UserAuthenticatorQuery): Promise<UserAuthResponse> {
    const password = new UserPassword(query.password);
    const hashedPassword = new UserPassword(query.hashedPassword);
    const id = new UserId(query.id);

    return new UserAuthResponse(
      await this.userAuthenticator.run(password, hashedPassword, id),
    );
  }
}
