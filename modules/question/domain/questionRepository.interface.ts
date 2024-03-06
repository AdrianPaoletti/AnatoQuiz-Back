import { Criteria } from "../../shared/domain/criteria/criteria";

import { Question } from "./question";

export interface QuestionRepository {
  matching(criteria: Criteria): Promise<Question[]>;
}
