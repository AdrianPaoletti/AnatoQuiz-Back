import { inject, injectable } from "inversify";

import { USERS_INJECTIONS_TYPES } from "../../../../dependencyInjection/users/users.types";
import { UserEmail } from "../../../shared/domain/user/userEmail";
import { UserGoogle } from "../../../shared/domain/user/userGoogle";
import { UserId } from "../../../shared/domain/user/userId";
import { UserPassword } from "../../../shared/domain/user/userPassword";
import { User } from "../../domain/user";
import { UserActive } from "../../domain/userActive";
import { UserAdministrator } from "../../domain/userAdministrator";
import { UserName } from "../../domain/userName";
import { UserRepository } from "../../domain/userRepository.interface";

@injectable()
export class UserSignUpper {
  constructor(
    @inject(USERS_INJECTIONS_TYPES.MongoUserRepository)
    private readonly mongoUserRepository: UserRepository,
  ) {}

  async run({
    id,
    userName,
    email,
    password,
    administrator,
    active,
    google,
  }: {
    id: UserId;
    userName: UserName;
    email: UserEmail;
    password: UserPassword;
    administrator: UserAdministrator;
    active: UserActive;
    google: UserGoogle;
  }): Promise<void> {
    const user = User.create(
      id,
      userName,
      email,
      password,
      administrator,
      active,
      google,
    );

    await this.mongoUserRepository.save(user);
  }
}
