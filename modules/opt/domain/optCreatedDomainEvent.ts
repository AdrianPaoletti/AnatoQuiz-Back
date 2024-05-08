import { DomainEvent } from "../../shared/domain/domainEvent";

type OPTCreatedDomainEventAttributes = {
  readonly email: string;
  readonly value: string;
  readonly subject: string;
};

export class OPTCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = "opt.created";

  readonly email: string;
  readonly value: string;
  readonly subject: string;

  constructor({
    aggregateId,
    email,
    value,
    subject,
    eventId,
    occurredOn,
  }: {
    aggregateId: string;
    eventId?: string;
    email: string;
    value: string;
    subject: string;
    occurredOn?: Date;
  }) {
    super({
      eventName: OPTCreatedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn,
    });
    this.email = email;
    this.value = value;
    this.subject = subject;
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: OPTCreatedDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;

    return new OPTCreatedDomainEvent({
      aggregateId,
      email: attributes.email,
      value: attributes.value,
      subject: attributes.subject,
      eventId,
      occurredOn,
    });
  }

  toPrimitives(): OPTCreatedDomainEventAttributes {
    const { email, value, subject } = this;

    return {
      email,
      value,
      subject,
    };
  }
}
