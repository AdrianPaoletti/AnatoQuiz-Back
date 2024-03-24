import { AggregateRoot } from "../../shared/domain/aggregateRoot";
import { UserEmail } from "../../shared/domain/user/userEmail";

import { OPTId } from "./optId";
import { OPTPrimitives } from "./optPrimitives.interface";
import { OPTValue } from "./optValue";

export class OPT extends AggregateRoot {
  public readonly id: OPTId;
  public readonly email: UserEmail;
  public readonly value: OPTValue;

  constructor(id: OPTId, email: UserEmail, value: OPTValue) {
    super();
    this.id = id;
    this.email = email;
    this.value = value;
  }

  static create(id: OPTId, email: UserEmail, value: OPTValue): OPT {
    const opt = new OPT(id, email, value);

    return opt;
  }

  static generateOPT(): OPTValue {
    const value = Array.from({ length: 5 }, () =>
      Math.floor(Math.random() * 10),
    );

    return new OPTValue(value.join(""));
  }

  static fromPrimitives({ id, email, value }: OPTPrimitives): OPT {
    return new OPT(new OPTId(id), new UserEmail(email), new OPTValue(value));
  }

  public toPrimitives() {
    return {
      id: this.id.value,
      email: this.email.value,
      value: this.value.value,
    };
  }
}
