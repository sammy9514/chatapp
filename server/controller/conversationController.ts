import { Response } from "express";
import chatModel from "../model/chatModel";
import messageModel from "../model/mesageModel";
import { Schema, Types } from "mongoose";

export const sendMessage = async (req: any, res: Response) => {
  try {
    const { message } = req.body;
    const { id: receiver } = req.params;
    const { _id: sender } = req.user;

    let findChat: any = await chatModel.findOne({
      participant: { $all: [sender, receiver] },
    });

    if (!findChat) {
      findChat = await chatModel.create({
        participant: [sender, receiver],
        message,
      });
    }

    const newmessage: any = await messageModel.create({
      participant: [sender, receiver],
      message,
    });

    findChat.messages.push(new Types.ObjectId(newmessage._id));
    findChat.save();

    return res.status(201).json({
      result: "conversation created",
      data: newmessage,
    });
  } catch (error) {
    return res.status(500).json({ message: "error sending message" });
  }
};

export const getMessage = async (req: any, res: Response) => {
  try {
    const { id: receiver } = req.params;
    const sender = req.user._id;

    const senderId = new Types.ObjectId(sender);
    const receiverId = new Types.ObjectId(receiver);

    const findChat = await chatModel
      .findOne({
        participant: { $all: [senderId, receiverId] },
      })
      .populate({ path: "messages" });

    // if (!findChat) {
    //   res.status(200).json([]);
    //   return;
    // }

    const data = findChat?.messages;

    return res.status(200).json({
      message: "success",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error getting message",
    });
  }
};
