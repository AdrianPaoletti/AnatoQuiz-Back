import { User } from "../domain/user";
import { UserPrimitives } from "../domain/userPrimitives.interface";

export class UsersResponse {
  public readonly users: Array<UserPrimitives>;

  constructor(users: Array<User>) {
    this.users = users.map((user) => user.toPrimitives());
  }
}
