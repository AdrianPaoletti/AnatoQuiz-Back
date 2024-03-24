import { EnumValueObject } from "../valueObjects/enumValueObject";
import { InvalidArgumentError } from "../valueObjects/invalidArgumentError";

export enum Operator {
  CONJUNCTION = "&&",
  DISJUNCTION = "||",
  EQUAL = "=",
  NOT_EQUAL = "!=",
  GT = ">",
  LT = "<",
  IN = "in",
}

export class FilterOperator extends EnumValueObject<Operator> {
  constructor(value: Operator) {
    super(value, Object.values(Operator));
  }

  static fromValue(value: string): FilterOperator {
    for (const comparisonValue of Object.values(Operator)) {
      if (value === comparisonValue.toString()) {
        return new FilterOperator(comparisonValue);
      }
    }

    throw new InvalidArgumentError(`The filter operator ${value} is invalid`);
  }

  protected throwErrorForInvalidValue(value: Operator): void {
    throw new InvalidArgumentError(`The filter operator ${value} is invalid`);
  }
}
