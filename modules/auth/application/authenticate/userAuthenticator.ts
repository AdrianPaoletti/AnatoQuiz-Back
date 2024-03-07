import { inject, injectable } from "inversify";

import { USERSAUTH_INJECTIONS_TYPES } from "../../../../dependencyInjection/usersAuth/usersAuth.types";
import { UserId } from "../../../shared/domain/user/userId";
import { UserInvalidAuthCredentials } from "../../../shared/domain/user/userInvalidAuthCredentials";
import { UserPassword } from "../../../shared/domain/user/userPassword";
import { UserAuth } from "../../domain/userAuth";
import { UserAuthRepository } from "../../domain/userAuthRepository.interface";
import { UserGoogle } from "../../../shared/domain/user/userGoogle";

@injectable()
export class UserAuthenticator {
  constructor(
    @inject(USERSAUTH_INJECTIONS_TYPES.UserAuthRepository)
    private readonly userAuthRepository: UserAuthRepository,
  ) {}

  public async run(
    password: UserPassword,
    hashedPassword: UserPassword,
    id: UserId,
    google: UserGoogle,
  ): Promise<UserAuth> {
    if (!google.value) {
      this.ensurePasswordIsValid(password.value, hashedPassword.value);
    }

    const token = await this.userAuthRepository.generateToken(id.value);

    return UserAuth.fromPrimitives({ token, id: id.value });
  }

  private ensurePasswordIsValid(
    password: string,
    hashedPassword: string,
  ): void {
    if (!this.userAuthRepository.comparePassword(password, hashedPassword)) {
      throw new UserInvalidAuthCredentials("Invalid password");
    }
  }
}
