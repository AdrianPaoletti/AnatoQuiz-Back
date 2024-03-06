import { inject, injectable } from "inversify";

import { SHARED_INJECTIONS_TYPES } from "../../../../dependencyInjection/shared/shared.types";
import { Command } from "../../domain/command";
import { CommandBus } from "../../domain/commandBus.interface";

import { CommandHandlers } from "./commandHandlers";

@injectable()
export class InMemoryCommandBus implements CommandBus {
  constructor(
    @inject(SHARED_INJECTIONS_TYPES.CommandHandlers)
    private readonly commandHandlers: CommandHandlers,
  ) {}

  async dispatch(command: Command): Promise<void> {
    const handler = this.commandHandlers.get(command);
    await handler.handle(command);
  }
}
