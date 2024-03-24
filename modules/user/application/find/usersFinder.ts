import { inject, injectable } from "inversify";

import { USERS_INJECTIONS_TYPES } from "../../../../dependencyInjection/users/users.types";
import { Criteria } from "../../../shared/domain/criteria/criteria";
import { Filters } from "../../../shared/domain/criteria/filters";
import { User } from "../../domain/user";
import { UserInvalidNotExist } from "../../domain/userInvalidNotExist";
import { UserRepository } from "../../domain/userRepository.interface";

@injectable()
export class UsersFinder {
  constructor(
    @inject(USERS_INJECTIONS_TYPES.MongoUserRepository)
    private readonly mongoUserRepository: UserRepository,
  ) {}

  async run(filters: Filters): Promise<User> {
    const criteria = new Criteria(filters);
    const document = await this.mongoUserRepository.matchingOne(criteria);

    this.ensureUserExists(document);

    return document as User;
  }

  private ensureUserExists(user: User | null) {
    if (!user) {
      throw new UserInvalidNotExist("No users found");
    }
  }
}
