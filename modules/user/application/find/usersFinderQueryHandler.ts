import { inject, injectable } from "inversify";

import { USERS_INJECTIONS_TYPES } from "../../../../dependencyInjection/users/users.types";
import { Filters } from "../../../shared/domain/criteria/filters";
import { Order } from "../../../shared/domain/criteria/order";
import { Query } from "../../../shared/domain/query";
import { QueryHandler } from "../../../shared/domain/queryHandler.interface";
import { UsersResponse } from "../userResponse";

import { UsersFinder } from "./usersFinder";
import { UsersFinderQuery } from "./usersFinderQuery";

@injectable()
export class UsersFinderQueryHandler
  implements QueryHandler<UsersFinderQuery, UsersResponse>
{
  constructor(
    @inject(USERS_INJECTIONS_TYPES.UsersFinder)
    private readonly usersFinder: UsersFinder,
  ) {}

  subscribedTo(): Query {
    return UsersFinderQuery;
  }

  async handle(query: UsersFinderQuery): Promise<UsersResponse> {
    const filters = Filters.fromValues(query.filters);
    const order = Order.none();

    return new UsersResponse(await this.usersFinder.run(filters, order));
  }
}
