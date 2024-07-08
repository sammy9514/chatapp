import { Document, Schema, model } from "mongoose";

interface iChatData {
  participant: [];
  messages: [];
}

interface iChat extends iChatData, Document {}

const chatModel = new Schema<iChat>(
  {
    participant: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "message",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model<iChat>("chat", chatModel);
