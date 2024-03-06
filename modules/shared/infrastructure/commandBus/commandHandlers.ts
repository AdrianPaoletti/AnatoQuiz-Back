import { decorate, injectable, multiInject } from "inversify";

import { SHARED_INJECTIONS_TYPES } from "../../../../dependencyInjection/shared/shared.types";
import { Command } from "../../domain/command";
import { CommandHandler } from "../../domain/commandHandler.interface";

decorate(injectable(), Map<Command, CommandHandler<Command>>);
@injectable()
export class CommandHandlers extends Map<Command, CommandHandler<Command>> {
  constructor(
    @multiInject(SHARED_INJECTIONS_TYPES.CommandHandlersCommands)
    commandHandlers: Array<CommandHandler<Command>>,
  ) {
    super();

    commandHandlers.forEach((commandHandler) => {
      this.set(commandHandler.subscribedTo(), commandHandler);
    });
  }

  public get(command: Command): CommandHandler<Command> {
    const commandHandler = super.get(command.constructor);

    if (!commandHandler) {
      throw new Error(
        `The command <${command.constructor.name}> hasn't a command handler associated`,
      );
    }

    return commandHandler;
  }
}
