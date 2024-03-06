import { Query } from "./query";

export interface QueryHandler<Q extends Query, R extends any> {
  subscribedTo(): Query;
  handle(query: Q): Promise<R>;
}
