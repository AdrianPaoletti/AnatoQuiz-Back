import { Criteria } from "../../shared/domain/criteria/criteria";

import { OPT } from "./opt";

export interface OPTRepository {
  save(opt: OPT): Promise<void>;
  matchingOne(criteria: Criteria): Promise<OPT | null>;
}
