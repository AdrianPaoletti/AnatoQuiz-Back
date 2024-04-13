import { inject, injectable } from "inversify";

import { OPTS_INJECTIONS_TYPES } from "../../../../dependencyInjection/opts/opts.types";
import { SHARED_INJECTIONS_TYPES } from "../../../../dependencyInjection/shared/shared.types";
import { EventBus } from "../../../shared/domain/eventBus";
import { UserEmail } from "../../../shared/domain/user/userEmail";
import { OPT } from "../../domain/opt";
import { OPTId } from "../../domain/optId";
import { OPTRepository } from "../../domain/optRepository.interface";

@injectable()
export class OPTCreator {
  constructor(
    @inject(OPTS_INJECTIONS_TYPES.MongoOPTRepository)
    private readonly mongoOPTRepository: OPTRepository,
    @inject(SHARED_INJECTIONS_TYPES.InMemoryAsyncEventBus)
    private readonly inMemoryAsyncEventBus: EventBus,
  ) {}

  async run({ id, email }: { id: OPTId; email: UserEmail }): Promise<void> {
    const optValue = OPT.generateOPT();
    const opt = OPT.create(id, email, optValue);

    await this.mongoOPTRepository.save(opt);
    await this.inMemoryAsyncEventBus.publish(opt.pullDomainEvents());
  }
}
