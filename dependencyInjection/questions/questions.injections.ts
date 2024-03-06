import { Container } from "inversify";

import { Controller } from "../../controllers/controller.interface";
import { QuestionsGetController } from "../../controllers/questionsGet.controller";
import { QuestionsFinder } from "../../modules/question/application/find/questionsFinder";
import { QuestionRepository } from "../../modules/question/domain/questionRepository.interface";
import { MongoQuestionRepository } from "../../modules/question/infrastructure/persistence/mongo/mongoQuestionRepository";

import { QUESTIONS_INJECTIONS_TYPES } from "./questions.types";

export function bindContainer(container: Container): void {
  container
    .bind<Controller>(QUESTIONS_INJECTIONS_TYPES.QuestionsGetController)
    .to(QuestionsGetController);
  container
    .bind<QuestionsFinder>(QUESTIONS_INJECTIONS_TYPES.QuestionsFinder)
    .to(QuestionsFinder);
  container
    .bind<QuestionRepository>(
      QUESTIONS_INJECTIONS_TYPES.MongoQuestionRepository,
    )
    .to(MongoQuestionRepository);
}
