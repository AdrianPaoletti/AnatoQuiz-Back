import { ValueObject } from "../valueObjects/valueObject";

export class OPTValue extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureIsValidValue(value);
  }

  private ensureIsValidValue(value: string): void {
    const optValueRegExp = new RegExp(/^\d{5}$/);

    if (!optValueRegExp.test(value)) {
      throw new Error(`OPT value incorrect format for ${value}`);
    }
  }
}
