"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const userRouter_1 = __importDefault(require("./router/userRouter"));
const conversationRoute_1 = __importDefault(require("./router/conversationRoute"));
const aiRouter_1 = __importDefault(require("./router/aiRouter"));
const mainApp = (app) => {
    app.use("/api/v1", userRouter_1.default);
    app.use("/api/v1/chat", conversationRoute_1.default);
    app.use("/api/v1/ai", aiRouter_1.default);
    app.use("/", (req, res) => {
        try {
            res.status(200).json({
                message: "hello world",
            });
        }
        catch (error) {
            res.status(500).json({
                message: "error",
            });
        }
    });
};
exports.mainApp = mainApp;
