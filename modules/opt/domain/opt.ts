import { AggregateRoot } from "../../shared/domain/aggregateRoot";
import { OPTSubject } from "../../shared/domain/opt/optSubject";
import { OPTValue } from "../../shared/domain/opt/optValue";
import { UserEmail } from "../../shared/domain/user/userEmail";

import { OPTCreatedDomainEvent } from "./optCreatedDomainEvent";
import { OPTId } from "./optId";
import { OPTPrimitives } from "./optPrimitives.interface";

export class OPT extends AggregateRoot {
  public readonly id: OPTId;
  public readonly email: UserEmail;
  public readonly value: OPTValue;
  public readonly subject: OPTSubject;

  constructor(
    id: OPTId,
    email: UserEmail,
    value: OPTValue,
    subject: OPTSubject,
  ) {
    super();
    this.id = id;
    this.email = email;
    this.value = value;
    this.subject = subject;
  }

  static create(
    id: OPTId,
    email: UserEmail,
    value: OPTValue,
    subject: OPTSubject,
  ): OPT {
    const opt = new OPT(id, email, value, subject);

    opt.record(
      new OPTCreatedDomainEvent({
        aggregateId: opt.id.value,
        email: opt.email.value,
        value: opt.value.value,
        subject: opt.subject.value,
      }),
    );

    return opt;
  }

  static generateOPT(): OPTValue {
    const value = Array.from({ length: 5 }, () =>
      Math.floor(Math.random() * 10),
    );

    return new OPTValue(value.join(""));
  }

  static fromPrimitives({ id, email, value, subject }: OPTPrimitives): OPT {
    return new OPT(
      new OPTId(id),
      new UserEmail(email),
      new OPTValue(value),
      new OPTSubject(subject),
    );
  }

  public toPrimitives() {
    return {
      id: this.id.value,
      email: this.email.value,
      value: this.value.value,
      subject: this.subject.value,
    };
  }
}
