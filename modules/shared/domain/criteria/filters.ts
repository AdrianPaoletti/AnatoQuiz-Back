import { Filter, FilterType } from "./filter";

export class Filters {
  readonly filters: Filter[];

  constructor(filters: Filter[]) {
    this.filters = filters;
  }

  static fromValues(filters: FilterType[]): Filters {
    return new Filters(filters.map((filter) => Filter.fromValues(filter)));
  }
}
