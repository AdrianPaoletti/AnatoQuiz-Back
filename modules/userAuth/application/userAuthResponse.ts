import { UserAuth } from "../domain/userAuth";
import { UserAuthPrimitives } from "../domain/userAuthPrimitives.interface";

export class UserAuthResponse {
  public readonly userAuth: UserAuthPrimitives;

  constructor(userAuth: UserAuth) {
    this.userAuth = userAuth.toPrimitives();
  }
}
