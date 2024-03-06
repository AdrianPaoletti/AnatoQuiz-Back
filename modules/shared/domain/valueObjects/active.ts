import { ValueObject } from "./valueObject";

export class Active extends ValueObject<boolean> {
  constructor(value: boolean) {
    super(value);
    this.ensureIsActive(value);
  }

  private ensureIsActive(value: boolean) {
    if (!value) {
      throw new Error(`<${this.constructor.name}> does not allow false values`);
    }
  }
}
