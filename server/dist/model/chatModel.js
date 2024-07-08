"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const chatModel = new mongoose_1.Schema({
    participant: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "user",
        },
    ],
    messages: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "message",
        },
    ],
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("chat", chatModel);
