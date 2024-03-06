import { Question } from "../domain/question";
import { QuestionPrimitives } from "../domain/questionPrimitives.interface";

export class QuestionsResponse {
  public readonly questions: Array<QuestionPrimitives>;

  constructor(questions: Array<Question>) {
    this.questions = questions.map((question) => question.toPrimitives());
  }
}
