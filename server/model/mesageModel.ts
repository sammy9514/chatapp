import { Document, Schema, model } from "mongoose";

interface iMessageData {
  participant: [];
  message: string;
}

interface iMessage extends iMessageData, Document {}

const messageModel = new Schema<iMessage>(
  {
    participant: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<iMessage>("message", messageModel);
