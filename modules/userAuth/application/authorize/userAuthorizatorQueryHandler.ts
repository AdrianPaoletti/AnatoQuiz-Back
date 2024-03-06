import { inject, injectable } from "inversify";

import { USERSAUTH_INJECTIONS_TYPES } from "../../../../dependencyInjection/usersAuth/usersAuth.types";
import { Query } from "../../../shared/domain/query";
import { QueryHandler } from "../../../shared/domain/queryHandler.interface";
import { UserAuthToken } from "../../domain/userAuthToken";
import { UserAuthResponse } from "../userAuthResponse";

import { UserAuthorizator } from "./userAuthorizator";
import { UserAuthorizatorQuery } from "./userAuthorizatorQuery";

@injectable()
export class UserAuthorizatorQueryHandler
  implements QueryHandler<UserAuthorizatorQuery, UserAuthResponse>
{
  constructor(
    @inject(USERSAUTH_INJECTIONS_TYPES.UserAuthorizator)
    private readonly userAuthorizator: UserAuthorizator,
  ) {}

  subscribedTo(): Query {
    return UserAuthorizatorQuery;
  }

  async handle(query: UserAuthorizatorQuery): Promise<UserAuthResponse> {
    const token = new UserAuthToken(query.token);

    return new UserAuthResponse(await this.userAuthorizator.run(token));
  }
}
