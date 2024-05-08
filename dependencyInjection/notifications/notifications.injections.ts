import { Container } from "inversify";

import { EmailSender } from "../../modules/notification/application/sendEmail/emailSender";
import { EmailRepository } from "../../modules/notification/infrastructure/emailRepository";

import { NOTIFICATIONS_INJECTIONS_TYPES } from "./notifications.types";

export function bindContainer(container: Container): void {
  container
    .bind<EmailRepository>(NOTIFICATIONS_INJECTIONS_TYPES.EmailRepository)
    .to(EmailRepository);
  container
    .bind<EmailSender>(NOTIFICATIONS_INJECTIONS_TYPES.EmailSender)
    .to(EmailSender);
}
