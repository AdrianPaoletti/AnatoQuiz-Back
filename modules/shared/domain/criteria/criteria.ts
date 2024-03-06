import { Filters } from "./filters";
import { Order } from "./order";

export class Criteria {
  public readonly filters: Filters;
  public readonly order?: Order;
  public readonly limit?: number;
  public readonly offset?: number;

  constructor(
    filters: Filters,
    order?: Order,
    limit?: number,
    offset?: number,
  ) {
    this.filters = filters;
    this.order = order;
    this.limit = limit;
    this.offset = offset;
  }

  public hasFilters(): boolean {
    return this.filters.filters.length > 0;
  }
}
