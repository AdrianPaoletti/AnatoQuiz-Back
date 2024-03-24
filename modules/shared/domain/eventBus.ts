import { DomainEvent } from "./domainEvent";
import { IDomainEventSubscribers } from "./domainEventSubscribers.interface";

export interface EventBus {
  publish(events: Array<DomainEvent>): Promise<void>;
  addSubscribers(subscribers: IDomainEventSubscribers): void;
}
