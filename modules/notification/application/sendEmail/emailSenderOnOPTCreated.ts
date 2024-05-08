import { inject, injectable } from "inversify";

import { NOTIFICATIONS_INJECTIONS_TYPES } from "../../../../dependencyInjection/notifications/notifications.types";
import { OPTCreatedDomainEvent } from "../../../opt/domain/optCreatedDomainEvent";
import { DomainEventClass } from "../../../shared/domain/domainEvent";
import { DomainEventSubscriber } from "../../../shared/domain/domainEventSubscriber";
import { OPTSubject } from "../../../shared/domain/opt/optSubject";
import { OPTValue } from "../../../shared/domain/opt/optValue";
import { UserEmail } from "../../../shared/domain/user/userEmail";

import { EmailSender } from "./emailSender";

@injectable()
export class EmailSenderOnOPTCreated
  implements DomainEventSubscriber<OPTCreatedDomainEvent>
{
  constructor(
    @inject(NOTIFICATIONS_INJECTIONS_TYPES.EmailSender)
    private readonly emailSender: EmailSender,
  ) {}

  subscribedTo(): DomainEventClass[] {
    return [OPTCreatedDomainEvent];
  }

  async on({ email, value, subject }: OPTCreatedDomainEvent) {
    this.emailSender.run(
      new UserEmail(email),
      new OPTValue(value),
      new OPTSubject(subject),
    );
  }
}
