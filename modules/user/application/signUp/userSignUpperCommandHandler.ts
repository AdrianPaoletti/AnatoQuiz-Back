import { inject, injectable } from "inversify";

import { USERS_INJECTIONS_TYPES } from "../../../../dependencyInjection/users/users.types";
import { Command } from "../../../shared/domain/command";
import { CommandHandler } from "../../../shared/domain/commandHandler.interface";
import { UserEmail } from "../../../shared/domain/user/userEmail";
import { UserGoogle } from "../../../shared/domain/user/userGoogle";
import { UserId } from "../../../shared/domain/user/userId";
import { UserPassword } from "../../../shared/domain/user/userPassword";
import { UserActive } from "../../domain/userActive";
import { UserAdministrator } from "../../domain/userAdministrator";
import { UserName } from "../../domain/userName";

import { UserSignUpper } from "./userSignUpper";
import { UserSignUpperCommand } from "./userSignUpperCommand";

@injectable()
export class UserSignUpperCommandHandler
  implements CommandHandler<UserSignUpperCommand>
{
  constructor(
    @inject(USERS_INJECTIONS_TYPES.UserSignUpper)
    private readonly userSignUpper: UserSignUpper,
  ) {}

  subscribedTo(): Command {
    return UserSignUpperCommand;
  }

  async handle(command: UserSignUpperCommand): Promise<void> {
    const id = new UserId(command.id);
    const userName = new UserName(command.username);
    const email = new UserEmail(command.email);
    const password = new UserPassword(command.password);
    const administrator = new UserAdministrator(command.administrator);
    const active = new UserActive(command.active);
    const google = new UserGoogle(command.google);

    await this.userSignUpper.run({
      id,
      userName,
      email,
      password,
      administrator,
      active,
      google,
    });
  }
}
