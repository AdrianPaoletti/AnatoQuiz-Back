import { injectable, multiInject } from "inversify";

import { SHARED_INJECTIONS_TYPES } from "../../../../dependencyInjection/shared/shared.types";
import { Query } from "../../domain/query";
import { QueryHandler } from "../../domain/queryHandler.interface";
import { Response } from "../../domain/response";

// decorate(injectable(), Map<Query, QueryHandler<Query, Response>>);
@injectable()
export class QueryHandlers extends Map<Query, QueryHandler<Query, Response>> {
  constructor(
    @multiInject(SHARED_INJECTIONS_TYPES.QueryHandlersQueries)
    queryHandlers: Array<QueryHandler<Query, Response>>,
  ) {
    super();
    queryHandlers.forEach((queryHandler) => {
      this.set(queryHandler.subscribedTo(), queryHandler);
    });
  }

  public get(query: Query): QueryHandler<Query, Response> {
    const queryHandler = super.get(query.constructor);

    if (!queryHandler) {
      throw new Error(
        `The query <${query.constructor.name}> hasn't a query handler associated`,
      );
    }

    return queryHandler;
  }
}
