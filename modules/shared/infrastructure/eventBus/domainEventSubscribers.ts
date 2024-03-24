import { Container } from "inversify";

import { SHARED_INJECTIONS_TYPES } from "../../../../dependencyInjection/shared/shared.types";
import { DomainEvent } from "../../domain/domainEvent";
import { DomainEventSubscriber } from "../../domain/domainEventSubscriber";
import { IDomainEventSubscribers } from "../../domain/domainEventSubscribers.interface";

export class DomainEventSubscribers implements IDomainEventSubscribers {
  private constructor(
    public items: Array<DomainEventSubscriber<DomainEvent>>,
  ) {}

  static from(container: Container): any {
    const subscriberDefinitions = container.getAll(
      SHARED_INJECTIONS_TYPES.DomainEventsSubscriber,
    );

    console.log("==========>", subscriberDefinitions);
  }
}
