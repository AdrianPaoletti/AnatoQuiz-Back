import { inject, injectable } from "inversify";

import { USERS_INJECTIONS_TYPES } from "../../../../dependencyInjection/users/users.types";
import { Criteria } from "../../../shared/domain/criteria/criteria";
import { Filters } from "../../../shared/domain/criteria/filters";
import { Order } from "../../../shared/domain/criteria/order";
import { User } from "../../domain/user";
import { UserInvalidNotExist } from "../../domain/userInvalidNotExist";
import { UserRepository } from "../../domain/userRepository.interface";

@injectable()
export class UsersFinder {
  constructor(
    @inject(USERS_INJECTIONS_TYPES.MongoUserRepository)
    private readonly mongoUserRepository: UserRepository,
  ) {}

  async run(filters: Filters, order: Order): Promise<User[]> {
    const criteria = new Criteria(filters, order);
    const documents = await this.mongoUserRepository.matching(criteria);

    this.ensureUsersExists(documents);

    return documents;
  }

  private ensureUsersExists(users: User[]) {
    if (!users.length) {
      throw new UserInvalidNotExist("No users found");
    }
  }
}
