import { FilterType } from "../../../shared/domain/criteria/filter";
import { Query } from "../../../shared/domain/query";

export class OPTFinderQuery implements Query {
  readonly filters: FilterType[];

  constructor(email: string, value: string) {
    this.filters = this.buildFilters(email, value);
  }

  private buildFilters(email: string, value: string): FilterType[] {
    return [
      {
        field: "email",
        value: email,
        operator: "=",
      },
      {
        field: "value",
        value,
        operator: "=",
      },
    ];
  }
}
