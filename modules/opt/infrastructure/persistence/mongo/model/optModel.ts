import { model, Schema } from "mongoose";

export interface IOPT {
  _id: string;
  email: string;
  value: string;
  subject: string;
}

const optSchema: Schema<IOPT> = new Schema(
  {
    _id: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    value: { type: String, required: true },
    subject: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

optSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

export const OPTModel = model("Opt", optSchema, "Opts");
