import { ValueObject } from "../valueObjects/valueObject";

export class UserPassword extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureStrongPassword(value);
    this.ensureLenghtIsBiggerThan8Characters(value);
  }

  private ensureStrongPassword(value: string): void {
    const userPasswordRegExp = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])",
    );

    if (!userPasswordRegExp.test(value)) {
      throw new Error(
        `The user password <${value}> must contain: a special character, an uppercase character, a lowercase character and a numeric character`,
      );
    }
  }

  private ensureLenghtIsBiggerThan8Characters(value: string): void {
    if (value.length < 7) {
      throw new Error(
        `The user password <${value}> has lest than 8 characters`,
      );
    }
  }
}
