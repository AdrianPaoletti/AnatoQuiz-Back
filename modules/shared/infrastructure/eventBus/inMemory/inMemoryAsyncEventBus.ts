import EventEmitter from "events";
import { injectable } from "inversify";

import { DomainEvent } from "../../../domain/domainEvent";
import { EventBus } from "../../../domain/eventBus";
import { DomainEventSubscribers } from "../domainEventSubscribers";

const eventEmitter = new EventEmitter();
@injectable()
export class InMemoryAsyncEventBus implements EventBus {
  async publish(events: DomainEvent[]): Promise<void> {
    events.map((event) => eventEmitter.emit(event.eventName, event));
  }

  addSubscribers(subscribers: DomainEventSubscribers): void {
    subscribers.items.forEach((subscriber) => {
      subscriber.subscribedTo().forEach((event) => {
        eventEmitter.on(event.EVENT_NAME, subscriber.on.bind(subscriber));
      });
    });
  }
}
