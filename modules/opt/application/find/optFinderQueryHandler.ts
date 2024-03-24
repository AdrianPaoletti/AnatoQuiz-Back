import { inject, injectable } from "inversify";

import { OPTS_INJECTIONS_TYPES } from "../../../../dependencyInjection/opts/opts.types";
import { Filters } from "../../../shared/domain/criteria/filters";
import { Query } from "../../../shared/domain/query";
import { QueryHandler } from "../../../shared/domain/queryHandler.interface";
import { OPTResponse } from "../optResponse";

import { OPTFinder } from "./optFinder";
import { OPTFinderQuery } from "./optFinderQuery";

@injectable()
export class OPTFinderQueryHandler
  implements QueryHandler<OPTFinderQuery, OPTResponse>
{
  constructor(
    @inject(OPTS_INJECTIONS_TYPES.OPTFinder)
    private readonly optFinder: OPTFinder,
  ) {}

  subscribedTo(): Query {
    return OPTFinderQuery;
  }

  async handle(query: OPTFinderQuery): Promise<OPTResponse> {
    const filters = Filters.fromValues(query.filters);

    return new OPTResponse(await this.optFinder.run(filters));
  }
}
