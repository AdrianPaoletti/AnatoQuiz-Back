import { inject, injectable } from "inversify";

import { SHARED_INJECTIONS_TYPES } from "../../../../dependencyInjection/shared/shared.types";
import { EventBus } from "../../../shared/domain/eventBus";
import { OPTValue } from "../../../shared/domain/opt/optValue";
import { UserEmail } from "../../../shared/domain/user/userEmail";

@injectable()
export class EmailSender {
  constructor(
    @inject(SHARED_INJECTIONS_TYPES.InMemoryAsyncEventBus)
    private readonly inMemoryAsyncEventBus: EventBus,
  ) {}

  run(email: UserEmail, OPTValue: OPTValue): void {
    console.log("yowwww mamamamamamam");
  }
}
