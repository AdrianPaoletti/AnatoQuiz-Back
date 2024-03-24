import { FilterType } from "../../../shared/domain/criteria/filter";
import { Query } from "../../../shared/domain/query";

export class UsersFinderQuery implements Query {
  readonly filters: FilterType[];

  constructor(values: { [key: string]: string }) {
    this.filters = this.buildFilters(values);
  }

  private buildFilters(values: { [key: string]: string }): FilterType[] {
    return [
      ...Object.keys(values).map((key) => ({
        field: key,
        value: values[key],
        operator: "=",
      })),
      {
        field: "active",
        value: true,
        operator: "=",
      },
    ];
  }
}
