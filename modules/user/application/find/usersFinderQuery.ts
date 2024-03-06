import { FilterType } from "../../../shared/domain/criteria/filter";
import { Query } from "../../../shared/domain/query";

export class UsersFinderQuery implements Query {
  readonly filters;
  readonly orderBy?: string;
  readonly orderType?: string;
  readonly limit?: number;
  readonly offset?: number;

  constructor(
    filter: FilterType[],
    orderBy?: string,
    orderType?: string,
    limit?: number,
    offset?: number,
  ) {
    this.filters = filter;
    this.orderBy = orderBy;
    this.orderType = orderType;
    this.limit = limit;
    this.offset = offset;
  }
}
