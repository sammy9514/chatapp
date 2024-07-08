import { Document, Schema, model } from "mongoose";

interface iUserData {
  name: string;
  userName: string;
  password: string;
  gender: string;
  avatar: string;
  ai: [];
}

interface iUser extends iUserData, Document {}

const userModel = new Schema<iUser>(
  {
    name: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    avatar: {
      type: String,
    },
    ai: [
      {
        type: String,
        ref: "ai",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model<iUser>("User", userModel);
