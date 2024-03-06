import { inject, injectable } from "inversify";

import { QUESTIONS_INJECTIONS_TYPES } from "../../../../dependencyInjection/questions/questions.types";
import { Criteria } from "../../../shared/domain/criteria/criteria";
import { Filters } from "../../../shared/domain/criteria/filters";
import { Order } from "../../../shared/domain/criteria/order";
import { Question } from "../../domain/question";
import { QuestionRepository } from "../../domain/questionRepository.interface";

@injectable()
export class QuestionsFinder {
  constructor(
    @inject(QUESTIONS_INJECTIONS_TYPES.MongoQuestionRepository)
    private readonly mongoQuestionRepository: QuestionRepository,
  ) {}

  async run(
    filters: Filters,
    order: Order,
    limit?: number,
    offset?: number,
  ): Promise<Question[]> {
    const criteria = new Criteria(filters, order, limit, offset);
    const documents = await this.mongoQuestionRepository.matching(criteria);

    return documents;
  }
}
