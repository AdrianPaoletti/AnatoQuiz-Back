import { AggregateRoot } from "../../shared/domain/aggregateRoot";

import { QuestionActive } from "./questionActive";
import { QuestionAnswer } from "./questionAnswer";
import { QuestionDifficulty } from "./questionDifficulty";
import { QuestionId } from "./questionId";
import { QuestionLesson } from "./questionLesson";
import { QuestionPrimitives } from "./questionPrimitives.interface";
import { QuestionQuestion } from "./questionQuestion";
import { QuestionSubject } from "./questionSubject";

export class Question extends AggregateRoot {
  public readonly id: QuestionId;
  public readonly subject: QuestionSubject;
  public readonly lesson: QuestionLesson;
  public readonly question: QuestionQuestion;
  public readonly answers: Array<QuestionAnswer>;
  public readonly dificulty: QuestionDifficulty;
  public readonly active: QuestionActive;

  constructor(
    id: QuestionId,
    subject: QuestionSubject,
    lesson: QuestionLesson,
    question: QuestionQuestion,
    answers: Array<QuestionAnswer>,
    dificulty: QuestionDifficulty,
    active: QuestionActive,
  ) {
    super();
    this.id = id;
    this.subject = subject;
    this.lesson = lesson;
    this.question = question;
    this.answers = answers;
    this.dificulty = dificulty;
    this.active = active;
  }

  static fromPrimitives({
    id,
    subject,
    lesson,
    question,
    answers,
    difficulty,
    active,
  }: QuestionPrimitives): Question {
    const questionAnswers = answers.map(({ id, answer, correct }) =>
      QuestionAnswer.fromPrimitives({ id, answer, correct }),
    );

    return new Question(
      new QuestionId(id),
      new QuestionSubject(subject),
      new QuestionLesson(lesson),
      new QuestionQuestion(question),
      questionAnswers,
      new QuestionDifficulty(difficulty),
      new QuestionActive(active),
    );
  }

  public toPrimitives(): QuestionPrimitives {
    return {
      id: this.id.value,
      subject: this.subject.value,
      lesson: this.lesson.value,
      question: this.question.value,
      answers: this.answers.map((answer) => answer.toPrimitives()),
      difficulty: this.dificulty.value,
      active: this.active.value,
    };
  }
}
