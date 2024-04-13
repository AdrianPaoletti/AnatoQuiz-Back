import { DomainEvent } from "../../shared/domain/domainEvent";

type OPTCreatedDomainEventAttributes = {
  readonly email: string;
  readonly value: string;
};

export class OPTCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = "opt.created";

  readonly email: string;
  readonly value: string;

  constructor({
    aggregateId,
    email,
    value,
    eventId,
    occurredOn,
  }: {
    aggregateId: string;
    eventId?: string;
    email: string;
    value: string;
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
      eventId,
      occurredOn,
    });
  }

  toPrimitives(): OPTCreatedDomainEventAttributes {
    const { email, value } = this;

    return {
      email,
      value,
    };
  }
}
