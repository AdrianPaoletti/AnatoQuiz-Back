import { AggregateRoot } from "../../shared/domain/aggregateRoot";
import { UserEmail } from "../../shared/domain/user/userEmail";
import { UserGoogle } from "../../shared/domain/user/userGoogle";
import { UserId } from "../../shared/domain/user/userId";
import { UserPassword } from "../../shared/domain/user/userPassword";

import { UserActive } from "./userActive";
import { UserAdministrator } from "./userAdministrator";
import { UserName } from "./userName";
import { UserPrimitives } from "./userPrimitives.interface";

export class User extends AggregateRoot {
  public readonly id: UserId;
  public readonly userName: UserName;
  public readonly email: UserEmail;
  public readonly password: UserPassword;
  public readonly administrator: UserAdministrator;
  public readonly active: UserActive;
  public readonly google: UserGoogle;

  constructor(
    id: UserId,
    userName: UserName,
    email: UserEmail,
    password: UserPassword,
    administrator: UserAdministrator,
    active: UserActive,
    google: UserGoogle,
  ) {
    super();
    this.id = id;
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.administrator = administrator;
    this.active = active;
    this.google = google;
  }

  static create(
    id: UserId,
    userName: UserName,
    email: UserEmail,
    password: UserPassword,
    administrator: UserAdministrator,
    active: UserActive,
    google: UserGoogle,
  ): User {
    const user = new User(
      id,
      userName,
      email,
      password,
      administrator,
      active,
      google,
    );

    return user;
  }

  static fromPrimitives({
    id,
    username,
    email,
    password,
    administrator,
    active,
    google,
  }: UserPrimitives): User {
    return new User(
      new UserId(id),
      new UserName(username),
      new UserEmail(email),
      new UserPassword(password),
      new UserAdministrator(administrator),
      new UserActive(active),
      new UserGoogle(google),
    );
  }

  public toPrimitives() {
    return {
      id: this.id.value,
      username: this.userName.value,
      email: this.email.value,
      password: this.password.value,
      administrator: this.administrator.value,
      active: this.active.value,
      google: this.google.value,
    };
  }
}
