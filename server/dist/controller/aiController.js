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
exports.createAiChat = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const openai_1 = require("openai");
const configureAi_1 = require("../utils/configureAi");
const createAiChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const { content } = req.body;
        const checkUser = yield userModel_1.default.findById(userId);
        if (!checkUser) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        const configuration = (0, configureAi_1.configureAi)();
        const openAi = new openai_1.OpenAI(configuration);
        const getResponse = yield openAi.chat.completions.create({
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
    }
    catch (error) {
        console.error("Error creating AI chat:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.createAiChat = createAiChat;
