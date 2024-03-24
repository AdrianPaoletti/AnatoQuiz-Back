import { ValueObject } from "../valueObjects/valueObject";

export class UserEmail extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureIsValidEmail(value);
  }

  private ensureIsValidEmail(value: string): void {
    const userEmailRegExp = new RegExp(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    );

    if (!userEmailRegExp.test(value)) {
      throw new Error(`User email incorrect format for ${value}`);
    }
  }
}
