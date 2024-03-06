import { QuestionAnswerPrimitives } from "./questionAnswerPrimitives.interface";

export interface QuestionPrimitives {
  id: string;
  subject: string;
  lesson: string;
  question: string;
  answers: Array<QuestionAnswerPrimitives>;
  difficulty: number;
  active: boolean;
}
