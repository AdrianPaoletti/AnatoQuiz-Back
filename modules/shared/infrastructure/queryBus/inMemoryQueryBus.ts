import { inject, injectable } from "inversify";

import { SHARED_INJECTIONS_TYPES } from "../../../../dependencyInjection/shared/shared.types";
import { Query } from "../../domain/query";
import { QueryBus } from "../../domain/queryBus.interface";
import { Response } from "../../domain/response";

import { QueryHandlers } from "./queryHandlers";

@injectable()
export class InMemoryQueryBus implements QueryBus {
  constructor(
    @inject(SHARED_INJECTIONS_TYPES.QueryHandlers)
    private readonly queryHandlers: QueryHandlers,
  ) {}

  async ask<R extends Response>(query: Query): Promise<R> {
    const handler = this.queryHandlers.get(query);

    return (await handler.handle(query)) as Promise<R>;
  }
}
