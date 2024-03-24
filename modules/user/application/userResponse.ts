import { User } from "../domain/user";
import { UserPrimitives } from "../domain/userPrimitives.interface";

export class UserResponse {
  public readonly user: UserPrimitives;

  constructor(user: User) {
    this.user = user.toPrimitives();
  }
}
