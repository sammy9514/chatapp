import { model } from "mongoose";
import { Document, Schema } from "mongoose";

interface aiData {
  content: string;
  role: string;
}

interface ai extends aiData, Document {}

const aiModel = new Schema<ai>(
  {
    content: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<ai>("ai", aiModel);
