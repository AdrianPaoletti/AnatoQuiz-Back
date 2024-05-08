import { Command } from "../../../shared/domain/command";

export class OPTCreatorCommand extends Command {
  readonly id: string;
  readonly email: string;
  readonly subject: string;

  constructor({
    id,
    email,
    subject,
  }: {
    id: string;
    email: string;
    subject: string;
  }) {
    super();
    this.id = id;
    this.email = email;
    this.subject = subject;
  }
}
