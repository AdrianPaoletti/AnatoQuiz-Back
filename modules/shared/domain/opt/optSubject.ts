import { SUBJECT_TYPES } from "../../../opt/domain/optPrimitives.interface";
import { ValueObject } from "../valueObjects/valueObject";

export class OPTSubject extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureOPTValueSubject(value);
  }

  private ensureOPTValueSubject(subject: string) {
    if (!Object.values(SUBJECT_TYPES).includes(subject as SUBJECT_TYPES)) {
      throw new Error(`OPT invalid subject name for: ${subject}`);
    }
  }
}
