import { Request, Response } from "express";
import userModel from "../model/userModel";
import { OpenAI } from "openai";
import { configureAi } from "../utils/configureAi";

export const createAiChat = async (req: any, res: Response) => {
  try {
    const userId = req.user._id;
    const { content } = req.body;

    const checkUser = await userModel.findById(userId);

    if (!checkUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const configuration: any = configureAi();
    const openAi = new OpenAI(configuration);

    const getResponse: any = await openAi.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: content,
        },
      ],
      max_tokens: 100, // Limit the number of tokens to reduce usage
    });

    const aiMessage = getResponse.data.choices[0].message.content;

    console.log(aiMessage);
    return res.status(200).json({ data: aiMessage });
  } catch (error) {
    console.error("Error creating AI chat:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
