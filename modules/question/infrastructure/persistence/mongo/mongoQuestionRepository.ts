import { injectable } from "inversify";
import { Model } from "mongoose";

import { Criteria } from "../../../../shared/domain/criteria/criteria";
import { MongoDBRepository } from "../../../../shared/infrastructure/persistence/mongo/mongoDBRepository";
import { Question } from "../../../domain/question";
import { QuestionRepository } from "../../../domain/questionRepository.interface";

import { IQuestion, QuestionModel } from "./model/questionModel";

@injectable()
export class MongoQuestionRepository
  extends MongoDBRepository<Question>
  implements QuestionRepository
{
  public async matching(criteria: Criteria): Promise<Question[]> {
    const documents = await this.searchByCriteria<IQuestion>(criteria);

    return documents.map(
      ({ _id: id, subject, lesson, question, answers, difficulty, active }) => {
        const questionAnswers = answers.map(({ _id: id, answer, correct }) => ({
          id,
          answer,
          correct,
        }));

        return Question.fromPrimitives({
          id,
          subject,
          lesson,
          question,
          answers: questionAnswers,
          difficulty,
          active,
        });
      },
    );
  }

  protected modelDB(): Model<IQuestion> {
    return QuestionModel;
  }
}
