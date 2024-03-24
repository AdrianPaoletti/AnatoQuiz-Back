import { inject, injectable } from "inversify";

import { USERS_INJECTIONS_TYPES } from "../../../../dependencyInjection/users/users.types";
import { Filters } from "../../../shared/domain/criteria/filters";
import { Query } from "../../../shared/domain/query";
import { QueryHandler } from "../../../shared/domain/queryHandler.interface";
import { UserResponse } from "../userResponse";

import { UsersFinder } from "./usersFinder";
import { UsersFinderQuery } from "./usersFinderQuery";

@injectable()
export class UsersFinderQueryHandler
  implements QueryHandler<UsersFinderQuery, UserResponse>
{
  constructor(
    @inject(USERS_INJECTIONS_TYPES.UsersFinder)
    private readonly usersFinder: UsersFinder,
  ) {}

  subscribedTo(): Query {
    return UsersFinderQuery;
  }

  async handle(query: UsersFinderQuery): Promise<UserResponse> {
    const filters = Filters.fromValues(query.filters);
    // const order = Order.none();

    return new UserResponse(await this.usersFinder.run(filters));
  }
}
