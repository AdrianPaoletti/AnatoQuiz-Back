import { inject, injectable } from "inversify";

import { USERSAUTH_INJECTIONS_TYPES } from "../../../../dependencyInjection/usersAuth/usersAuth.types";
import { UserInvalidAuthCredentials } from "../../../shared/domain/user/userInvalidAuthCredentials";
import { UserAuth } from "../../domain/userAuth";
import { UserAuthRepository } from "../../domain/userAuthRepository.interface";
import { UserAuthToken } from "../../domain/userAuthToken";

@injectable()
export class UserAuthorizator {
  constructor(
    @inject(USERSAUTH_INJECTIONS_TYPES.UserAuthRepository)
    private readonly userAuthRepository: UserAuthRepository,
  ) {}

  public async run(token: UserAuthToken): Promise<UserAuth> {
    const id = await this.userAuthRepository
      .validateToken(token.value)
      .catch((error) => {
        throw new UserInvalidAuthCredentials("Invalid token");
      });

    return UserAuth.fromPrimitives({ token: token.value, id });
  }
}
