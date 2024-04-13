import { Container } from "inversify";

import { EmailSender } from "../../modules/notification/application/sendEmail/emailSender";

import { NOTIFICATIONS_INJECTIONS_TYPES } from "./notifications.types";

export function bindContainer(container: Container): void {
  container
    .bind<EmailSender>(NOTIFICATIONS_INJECTIONS_TYPES.EmailSender)
    .to(EmailSender);
}
