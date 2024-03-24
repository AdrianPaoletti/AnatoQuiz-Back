export type Primitives =
  | String
  | string
  | string[]
  | number
  | Boolean
  | boolean
  | Date
  | undefined
  | null;

export abstract class ValueObject<T extends Primitives> {
  readonly value: T;

  constructor(value: T) {
    this.value = value;
    this.ensureValueIsDefined(value);
  }

  private ensureValueIsDefined(value: T): void {
    if (value === undefined || value === null) {
      throw new Error("Value must be defined");
    }
  }
}
