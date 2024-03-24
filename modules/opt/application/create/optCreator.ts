import { inject, injectable } from "inversify";

import { OPTS_INJECTIONS_TYPES } from "../../../../dependencyInjection/opts/opts.types";
import { UserEmail } from "../../../shared/domain/user/userEmail";
import { OPT } from "../../domain/opt";
import { OPTId } from "../../domain/optId";
import { OPTRepository } from "../../domain/optRepository.interface";

@injectable()
export class OPTCreator {
  constructor(
    @inject(OPTS_INJECTIONS_TYPES.MongoOPTRepository)
    private readonly mongoOPTRepository: OPTRepository,
  ) {}

  async run({ id, email }: { id: OPTId; email: UserEmail }): Promise<void> {
    const optValue = OPT.generateOPT();
    const opt = OPT.create(id, email, optValue);

    await this.mongoOPTRepository.save(opt);
  }
}
