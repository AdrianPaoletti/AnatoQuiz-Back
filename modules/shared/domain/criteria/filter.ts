import { FilterField } from "./filterField";
import { FilterOperator } from "./filterOperator";
import { FilterValue } from "./filterValue";

export interface FilterType {
  value: string | string[] | boolean;
  operator: string;
  field: string;
}

export class Filter {
  readonly field: FilterField;
  readonly value: FilterValue;
  readonly operator: FilterOperator;

  constructor(
    field: FilterField,
    value: FilterValue,
    operator: FilterOperator,
  ) {
    this.field = field;
    this.value = value;
    this.operator = operator;
  }

  static fromValues({ field, value, operator }: FilterType) {
    return new Filter(
      new FilterField(field),
      new FilterValue(value),
      FilterOperator.fromValue(operator),
    );
  }
}
