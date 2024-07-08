"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userModel = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true,
    },
    avatar: {
        type: String,
    },
    ai: [
        {
            type: String,
            ref: "ai",
        },
    ],
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("User", userModel);
