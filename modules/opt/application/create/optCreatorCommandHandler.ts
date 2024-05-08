import { inject, injectable } from "inversify";

import { OPTS_INJECTIONS_TYPES } from "../../../../dependencyInjection/opts/opts.types";
import { Command } from "../../../shared/domain/command";
import { CommandHandler } from "../../../shared/domain/commandHandler.interface";
import { OPTSubject } from "../../../shared/domain/opt/optSubject";
import { UserEmail } from "../../../shared/domain/user/userEmail";
import { OPTId } from "../../domain/optId";

import { OPTCreator } from "./optCreator";
import { OPTCreatorCommand } from "./optCreatorCommand";

@injectable()
export class OPTCreatorCommandHandler
  implements CommandHandler<OPTCreatorCommand>
{
  constructor(
    @inject(OPTS_INJECTIONS_TYPES.OPTCreator)
    private readonly optCreator: OPTCreator,
  ) {}

  subscribedTo(): Command {
    return OPTCreatorCommand;
  }

  async handle(command: OPTCreatorCommand): Promise<void> {
    const id = new OPTId(command.id);
    const email = new UserEmail(command.email);
    const subject = new OPTSubject(command.subject);
    await this.optCreator.run({
      id,
      email,
      subject,
    });
  }
}
