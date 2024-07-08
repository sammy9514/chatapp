"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessage = exports.sendMessage = void 0;
const chatModel_1 = __importDefault(require("../model/chatModel"));
const mesageModel_1 = __importDefault(require("../model/mesageModel"));
const mongoose_1 = require("mongoose");
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message } = req.body;
        const { id: receiver } = req.params;
        const { _id: sender } = req.user;
        let findChat = yield chatModel_1.default.findOne({
            participant: { $all: [sender, receiver] },
        });
        if (!findChat) {
            findChat = yield chatModel_1.default.create({
                participant: [sender, receiver],
                message,
            });
        }
        const newmessage = yield mesageModel_1.default.create({
            participant: [sender, receiver],
            message,
        });
        findChat.messages.push(new mongoose_1.Types.ObjectId(newmessage._id));
        findChat.save();
        return res.status(201).json({
            result: "conversation created",
            data: newmessage,
        });
    }
    catch (error) {
        return res.status(500).json({ message: "error sending message" });
    }
});
exports.sendMessage = sendMessage;
const getMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: receiver } = req.params;
        const sender = req.user._id;
        const senderId = new mongoose_1.Types.ObjectId(sender);
        const receiverId = new mongoose_1.Types.ObjectId(receiver);
        const findChat = yield chatModel_1.default
            .findOne({
            participant: { $all: [senderId, receiverId] },
        })
            .populate({ path: "messages" });
        // if (!findChat) {
        //   res.status(200).json([]);
        //   return;
        // }
        const data = findChat === null || findChat === void 0 ? void 0 : findChat.messages;
        return res.status(200).json({
            message: "success",
            data,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "error getting message",
        });
    }
});
exports.getMessage = getMessage;
