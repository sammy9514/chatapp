"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const messageModel = new mongoose_1.Schema({
    participant: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "user",
        },
    ],
    message: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("message", messageModel);
