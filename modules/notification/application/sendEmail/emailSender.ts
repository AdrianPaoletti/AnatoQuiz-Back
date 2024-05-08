import { inject, injectable } from "inversify";

import { NOTIFICATIONS_INJECTIONS_TYPES } from "../../../../dependencyInjection/notifications/notifications.types";
import { OPTSubject } from "../../../shared/domain/opt/optSubject";
import { OPTValue } from "../../../shared/domain/opt/optValue";
import { UserEmail } from "../../../shared/domain/user/userEmail";
import { EmailRepository } from "../../infrastructure/emailRepository";

@injectable()
export class EmailSender {
  constructor(
    @inject(NOTIFICATIONS_INJECTIONS_TYPES.EmailRepository)
    private readonly emailRepository: EmailRepository,
  ) {}

  run(email: UserEmail, optValue: OPTValue, optSubject: OPTSubject): void {
    const { subject, template } = this.getSubjectTemplate(optSubject.value);
    const mailOptions = this.emailRepository.mailOptions(
      email.value,
      subject,
      template,
      { optValue: optValue.value, user: email.value.split("@")[0] },
    );

    this.emailRepository.send(mailOptions);
  }

  private getSubjectTemplate(subject: string): {
    subject: string;
    template: string;
  } {
    switch (subject) {
      case "registration":
        return {
          subject: "Confirma tu correo 👋",
          template: "otp",
        };
      default:
        return {
          subject: "",
          template: "",
        };
    }
  }
}
