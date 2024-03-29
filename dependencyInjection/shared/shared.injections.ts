import { Container } from "inversify";

import { ValidateJWT } from "../../middlewares/auth/validateJWT.middleware";
import { UserAuthenticatorQueryHandler } from "../../modules/auth/application/authenticate/userAuthenticatorQueryHandler";
import { UserAuthorizatorQueryHandler } from "../../modules/auth/application/authorize/userAuthorizatorQueryHandler";
import { OPTCreatorCommandHandler } from "../../modules/opt/application/create/optCreatorCommandHandler";
import { OPTFinderQueryHandler } from "../../modules/opt/application/find/optFinderQueryHandler";
import { QuesitonsFinderQueryHandler } from "../../modules/question/application/find/questionsFinderQueryHandler";
import { Command } from "../../modules/shared/domain/command";
import { CommandBus } from "../../modules/shared/domain/commandBus.interface";
import { CommandHandler } from "../../modules/shared/domain/commandHandler.interface";
import { Query } from "../../modules/shared/domain/query";
import { QueryBus } from "../../modules/shared/domain/queryBus.interface";
import { QueryHandler } from "../../modules/shared/domain/queryHandler.interface";
import { Response } from "../../modules/shared/domain/response";
import { CommandHandlers } from "../../modules/shared/infrastructure/commandBus/commandHandlers";
import { InMemoryCommandBus } from "../../modules/shared/infrastructure/commandBus/inMemoryCommandBus";
import { InMemoryQueryBus } from "../../modules/shared/infrastructure/queryBus/inMemoryQueryBus";
import { QueryHandlers } from "../../modules/shared/infrastructure/queryBus/queryHandlers";
import { UsersFinderQueryHandler } from "../../modules/user/application/find/usersFinderQueryHandler";
import { UserSignUpperCommandHandler } from "../../modules/user/application/signUp/userSignUpperCommandHandler";

import { SHARED_INJECTIONS_TYPES } from "./shared.types";

export function bindContainer(container: Container): void {
  container
    .bind<
      Map<Command, CommandHandler<Command>>
    >(SHARED_INJECTIONS_TYPES.CommandHandlers)
    .to(CommandHandlers);
  container
    .bind<CommandBus>(SHARED_INJECTIONS_TYPES.InMemoryCommandBus)
    .to(InMemoryCommandBus);
  container
    .bind<
      Map<Query, QueryHandler<Query, Response>>
    >(SHARED_INJECTIONS_TYPES.QueryHandlers)
    .to(QueryHandlers);
  container
    .bind<QueryBus>(SHARED_INJECTIONS_TYPES.InMemoryQueryBus)
    .to(InMemoryQueryBus);
  container
    .bind<ValidateJWT>(SHARED_INJECTIONS_TYPES.ValidateJWT)
    .to(ValidateJWT);

  // CommandHandlersCommands
  container
    .bind<
      CommandHandler<Command>
    >(SHARED_INJECTIONS_TYPES.CommandHandlersCommands)
    .to(UserSignUpperCommandHandler);
  container
    .bind<
      CommandHandler<Command>
    >(SHARED_INJECTIONS_TYPES.CommandHandlersCommands)
    .to(OPTCreatorCommandHandler);

  // QueryHandlersQueries
  container
    .bind<
      QueryHandler<Query, Response>
    >(SHARED_INJECTIONS_TYPES.QueryHandlersQueries)
    .to(UserAuthenticatorQueryHandler);
  container
    .bind<
      QueryHandler<Query, Response>
    >(SHARED_INJECTIONS_TYPES.QueryHandlersQueries)
    .to(UsersFinderQueryHandler);
  container
    .bind<
      QueryHandler<Query, Response>
    >(SHARED_INJECTIONS_TYPES.QueryHandlersQueries)
    .to(QuesitonsFinderQueryHandler);
  container
    .bind<
      QueryHandler<Query, Response>
    >(SHARED_INJECTIONS_TYPES.QueryHandlersQueries)
    .to(UserAuthorizatorQueryHandler);
  container
    .bind<
      QueryHandler<Query, Response>
    >(SHARED_INJECTIONS_TYPES.QueryHandlersQueries)
    .to(OPTFinderQueryHandler);
}
