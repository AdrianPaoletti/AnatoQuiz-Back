import { Command } from "../../../shared/domain/command";
import { UserPrimitives } from "../../domain/userPrimitives.interface";

export class UserSignUpperCommand extends Command {
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly administrator: boolean;
  readonly active: boolean;
  readonly google: boolean;

  constructor({
    id,
    username,
    email,
    password,
    administrator,
    active,
    google
  }: UserPrimitives) {
    super();
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.administrator = administrator;
    this.active = active;
    this.google = google;
  }
}
