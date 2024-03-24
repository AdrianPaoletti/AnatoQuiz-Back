import { inject, injectable } from "inversify";

import { QUESTIONS_INJECTIONS_TYPES } from "../../../../dependencyInjection/questions/questions.types";
import { Filters } from "../../../shared/domain/criteria/filters";
import { Order } from "../../../shared/domain/criteria/order";
import { Query } from "../../../shared/domain/query";
import { QueryHandler } from "../../../shared/domain/queryHandler.interface";
import { QuestionsResponse } from "../questionsResponse";

import { QuestionsFinder } from "./questionsFinder";
import { QuestionsFinderQuery } from "./questionsFinderQuery";

@injectable()
export class QuesitonsFinderQueryHandler
  implements QueryHandler<QuestionsFinderQuery, QuestionsResponse>
{
  constructor(
    @inject(QUESTIONS_INJECTIONS_TYPES.QuestionsFinder)
    private readonly questionsFinder: QuestionsFinder,
  ) {}

  subscribedTo(): Query {
    return QuestionsFinderQuery;
  }

  async handle(query: QuestionsFinderQuery): Promise<QuestionsResponse> {
    const filters = Filters.fromValues(query.filters);
    const order = Order.fromValues(query.orderBy, query.orderType);
    const questions = await this.questionsFinder.run(
      filters,
      order,
      query.limit,
      query.offset,
    );

    return new QuestionsResponse(questions);
  }
}
