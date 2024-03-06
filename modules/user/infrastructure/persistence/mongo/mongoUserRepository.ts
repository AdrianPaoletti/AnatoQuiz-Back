import { decorate, injectable } from "inversify";
import { Model } from "mongoose";

import { Criteria } from "../../../../shared/domain/criteria/criteria";
import { MongoDBRepository } from "../../../../shared/infrastructure/persistence/mongo/mongoDBRepository";
import { User } from "../../../domain/user";
import { UserRepository } from "../../../domain/userRepository.interface";

import { IUser, UserModel } from "./model/userModel";

interface UserDocument {
  _id: string;
  username: string;
  email: string;
  password: string;
  administrator: boolean;
  active: boolean;
}

decorate(injectable(), MongoDBRepository<User>);
@injectable()
export class MongoUserRepository
  extends MongoDBRepository<User>
  implements UserRepository
{
  public async save(user: User): Promise<void> {
    await this.persist(user.id.value, user);
  }

  public async matching(criteria: Criteria): Promise<User[]> {
    const documents = await this.searchByCriteria<UserDocument>(criteria);

    return documents.map(
      ({ _id: id, username, email, password, administrator, active }) =>
        User.fromPrimitives({
          id,
          username,
          email,
          password,
          administrator,
          active,
        }),
    );
  }

  protected modelDB(): Model<IUser> {
    return UserModel;
  }
}
