import { Container } from "inversify";

import { Controller } from "../../controllers/controller.interface";
import { UserAuthenticatorGetController } from "../../controllers/userAuthenticatorGet.controller";
import { UserAuthenticator } from "../../modules/auth/application/authenticate/userAuthenticator";
import { UserAuthorizator } from "../../modules/auth/application/authorize/userAuthorizator";
import { UserAuthRepository as IUserAuthenticatorRepository } from "../../modules/auth/domain/userAuthRepository.interface";
import { UserAuthRepository } from "../../modules/auth/infrastructure/userAuthenticatorRepository";

import { USERSAUTH_INJECTIONS_TYPES } from "./usersAuth.types";

export function bindContainer(container: Container): void {
  container
    .bind<IUserAuthenticatorRepository>(
      USERSAUTH_INJECTIONS_TYPES.UserAuthRepository,
    )
    .to(UserAuthRepository);
  container
    .bind<Controller>(USERSAUTH_INJECTIONS_TYPES.UserAuthenticatorGetController)
    .to(UserAuthenticatorGetController);
  container
    .bind<UserAuthenticator>(USERSAUTH_INJECTIONS_TYPES.UserAuthenticator)
    .to(UserAuthenticator);
  container
    .bind<UserAuthorizator>(USERSAUTH_INJECTIONS_TYPES.UserAuthorizator)
    .to(UserAuthorizator);
}
