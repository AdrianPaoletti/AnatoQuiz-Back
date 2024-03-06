import { model, Schema } from "mongoose";

export interface Answer {
  _id: string;
  answer: string;
  correct: boolean;
}

export interface IQuestion {
  _id: string;
  subject: string;
  lesson: string;
  question: string;
  answers: Array<Answer>;
  difficulty: number;
  active: boolean;
}

const questionAnswer = {
  _id: { type: String, required: true },
  answer: { type: String, required: true },
  correct: { type: Boolean, required: true },
};

const questionSchema: Schema<IQuestion> = new Schema(
  {
    _id: { type: String, required: true },
    subject: { type: String, required: true },
    lesson: { type: String, required: true },
    question: { type: String, required: true },
    answers: [questionAnswer],
    difficulty: { type: Number, required: false, default: 1 },
    active: { type: Boolean, required: false, default: true },
  },
  {
    versionKey: false,
  },
);

export const QuestionModel = model("Question", questionSchema, "Questions");
