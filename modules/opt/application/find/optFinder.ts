import { inject, injectable } from "inversify";

import { OPTS_INJECTIONS_TYPES } from "../../../../dependencyInjection/opts/opts.types";
import { Criteria } from "../../../shared/domain/criteria/criteria";
import { Filters } from "../../../shared/domain/criteria/filters";
import { OPT } from "../../domain/opt";
import { OPTInvalid } from "../../domain/optInvalid";
import { OPTRepository } from "../../domain/optRepository.interface";

@injectable()
export class OPTFinder {
  constructor(
    @inject(OPTS_INJECTIONS_TYPES.MongoOPTRepository)
    private readonly mongoOPTRepository: OPTRepository,
  ) {}

  async run(filters: Filters): Promise<OPT> {
    const criteria = new Criteria(filters);
    const document = await this.mongoOPTRepository.matchingOne(criteria);

    this.ensureOPTExists(document);

    return document as OPT;
  }

  private ensureOPTExists(opt: OPT | null) {
    if (!opt) {
      throw new OPTInvalid("No users found");
    }
  }
}
