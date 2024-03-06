import { Container } from "inversify";

import { Controller } from "../../controllers/controller.interface";
import { UserSignUpperPostController } from "../../controllers/userSignUpperPost.controller";
import { UsersFinder } from "../../modules/user/application/find/usersFinder";
import { UserSignUpper } from "../../modules/user/application/signUp/userSignUpper";
import { UserRepository } from "../../modules/user/domain/userRepository.interface";
import { MongoUserRepository } from "../../modules/user/infrastructure/persistence/mongo/mongoUserRepository";

import { USERS_INJECTIONS_TYPES } from "./users.types";

export function bindContainer(container: Container): void {
  container
    .bind<Controller>(USERS_INJECTIONS_TYPES.UserSignUpperPostController)
    .to(UserSignUpperPostController);
  container
    .bind<UserSignUpper>(USERS_INJECTIONS_TYPES.UserSignUpper)
    .to(UserSignUpper);
  container
    .bind<UserRepository>(USERS_INJECTIONS_TYPES.MongoUserRepository)
    .to(MongoUserRepository);
  container
    .bind<UsersFinder>(USERS_INJECTIONS_TYPES.UsersFinder)
    .to(UsersFinder);
}
