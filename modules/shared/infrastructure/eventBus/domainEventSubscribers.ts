import { Container } from "inversify";

import { SHARED_INJECTIONS_TYPES } from "../../../../dependencyInjection/shared/shared.types";
import { DomainEvent } from "../../domain/domainEvent";
import { DomainEventSubscriber } from "../../domain/domainEventSubscriber";
import { IDomainEventSubscribers } from "../../domain/domainEventSubscribers.interface";

export class DomainEventSubscribers implements IDomainEventSubscribers {
  private constructor(
    public items: Array<DomainEventSubscriber<DomainEvent>>,
  ) {}

  static from(container: Container): DomainEventSubscribers {
    const subscriberDefinitions = container.getAll<
      DomainEventSubscriber<DomainEvent>
    >(SHARED_INJECTIONS_TYPES.DomainEventsSubscriber);

    return new DomainEventSubscribers(subscriberDefinitions);
    // const subscribers: Array<DomainEventSubscriber<DomainEvent>> = [];

    // subscriberDefinitions.forEach((value) => {
    //   const domainEventSubscriber = container.get<
    //     DomainEventSubscriber<DomainEvent>
    //   >(key.toString());
    //   console.log("yowww", value, key);
    // });
  }
}
