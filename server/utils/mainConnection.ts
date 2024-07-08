import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const uri = process.env.DATABASE_URI!;

export const dbConfig = () => {
  try {
    connect(uri).then(() => {
      console.log("connected to database");
    });
  } catch (error) {
    console.log(error);
  }
};
