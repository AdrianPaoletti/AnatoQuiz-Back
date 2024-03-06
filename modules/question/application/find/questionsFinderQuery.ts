import { FilterType } from "../../../shared/domain/criteria/filter";
import { Query } from "../../../shared/domain/query";

export class QuestionsFinderQuery implements Query {
  readonly filters: FilterType[];
  readonly orderBy?: string;
  readonly orderType?: string;
  readonly limit?: number;
  readonly offset?: number;

  constructor(
    filters: FilterType[],
    orderBy?: string,
    orderType?: string,
    limit?: number,
    offset?: number,
  ) {
    this.filters = filters;
    this.orderBy = orderBy;
    this.orderType = orderType;
    this.limit = limit;
    this.offset = offset;
  }
}
