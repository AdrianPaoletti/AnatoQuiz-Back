export const SHARED_INJECTIONS_TYPES = {
  CommandHandlers: Symbol.for("CommandHandlers"),
  InMemoryCommandBus: Symbol.for("InMemoryCommandBus"),
  CommandHandlersCommands: Symbol.for("CommandHandlersCommands"),
  QueryHandlersQueries: Symbol.for("QueryHandlersQueries"),
  InMemoryQueryBus: Symbol.for("InMemoryQueryBus"),
  QueryHandlers: Symbol.for("QueryHandlers"),
  AuthorizationMiddleware: Symbol.for("AuthorizationMiddleware"),
  ValidateJWT: Symbol.for("ValidateJWT"),
  DomainEventsSubscriber: Symbol.for("DomainEventsSubscriber"),
};
