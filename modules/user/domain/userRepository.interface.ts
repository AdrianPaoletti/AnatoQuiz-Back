import { Criteria } from "../../shared/domain/criteria/criteria";

import { User } from "./user";

export interface UserRepository {
  save(user: User): Promise<void>;
  matchingOne(criteria: Criteria): Promise<User | null>;
}
