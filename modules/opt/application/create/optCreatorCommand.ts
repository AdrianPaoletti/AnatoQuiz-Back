import { Command } from "../../../shared/domain/command";

export class OPTCreatorCommand extends Command {
  readonly id: string;
  readonly email: string;

  constructor({ id, email }: { id: string; email: string }) {
    super();
    this.id = id;
    this.email = email;
  }
}
