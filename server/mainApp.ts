import { Application, Request, Response } from "express";
import auth from "./router/userRouter";
import chat from "./router/conversationRoute";
import ai from "./router/aiRouter";

export const mainApp = (app: Application) => {
  app.use("/api/v1", auth);
  app.use("/api/v1/chat", chat);
  app.use("/api/v1/ai", ai);
  app.use("/", (req: Request, res: Response) => {
    try {
      res.status(200).json({
        message: "hello world",
      });
    } catch (error) {
      res.status(500).json({
        message: "error",
      });
    }
  });
};
