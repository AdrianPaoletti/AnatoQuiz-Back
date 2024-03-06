import { Criteria } from "../../shared/domain/criteria/criteria";

import { User } from "./user";

export interface UserRepository {
  save(user: User): Promise<void>;
  matching(criteria: Criteria): Promise<User[]>;
}
