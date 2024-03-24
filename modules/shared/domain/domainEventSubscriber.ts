import { DomainEvent } from "./domainEvent";

export interface DomainEventSubscriber<T extends DomainEvent> {
  subscribedTo(): Array<DomainEvent>;
  on(domainEvent: T): Promise<void>;
}
