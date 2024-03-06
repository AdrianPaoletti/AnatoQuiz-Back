import { model, Schema } from "mongoose";

export interface IUser {
  _id: string;
  email: string;
  username: string;
  password: string;
  administrator?: boolean;
  active?: boolean;
}

const userSchema: Schema<IUser> = new Schema(
  {
    _id: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    administrator: { type: Boolean, required: false, default: false },
    active: { type: Boolean, required: false, default: false },
  },
  {
    versionKey: false,
  },
);

export const UserModel = model("User", userSchema, "Users");
