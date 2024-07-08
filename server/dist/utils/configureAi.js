"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureAi = void 0;
// utils/configureAi.ts
const openai_1 = __importDefault(require("openai"));
const configureAi = () => {
    return new openai_1.default({
        apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in your environment variables
    });
};
exports.configureAi = configureAi;
