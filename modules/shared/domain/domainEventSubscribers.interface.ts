import { DomainEvent } from "./domainEvent";
import { DomainEventSubscriber } from "./domainEventSubscriber";

export interface IDomainEventSubscribers {
  items: Array<DomainEventSubscriber<DomainEvent>>;
}
