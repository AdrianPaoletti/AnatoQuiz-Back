import { QuestionAnswerAnswer } from "./questionAnswerAnswer";
import { QuestionAnswerCorrect } from "./questionAnswerCorrect";
import { QuestionAnswerId } from "./questionAnswerId";
import { QuestionAnswerPrimitives } from "./questionAnswerPrimitives.interface";

export class QuestionAnswer {
  public readonly id: QuestionAnswerId;
  public readonly answer: QuestionAnswerAnswer;
  public readonly correct: QuestionAnswerCorrect;

  constructor(
    id: QuestionAnswerId,
    answer: QuestionAnswerAnswer,
    correct: QuestionAnswerCorrect,
  ) {
    this.id = id;
    this.answer = answer;
    this.correct = correct;
  }

  static fromPrimitives({
    id,
    answer,
    correct,
  }: QuestionAnswerPrimitives): QuestionAnswer {
    return new QuestionAnswer(
      new QuestionAnswerId(id),
      new QuestionAnswerAnswer(answer),
      new QuestionAnswerCorrect(correct),
    );
  }

  public toPrimitives(): QuestionAnswerPrimitives {
    return {
      id: this.id.value,
      answer: this.answer.value,
      correct: this.correct.value,
    };
  }
}
