// import { DomainEvent } from "./domainEvent";

export abstract class AggregateRoot {
  // private readonly domainEvents: Array<DomainEvent>;
  public abstract toPrimitives(): any;
}
