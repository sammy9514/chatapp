"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const uri = process.env.DATABASE_URI;
const dbConfig = () => {
    try {
        (0, mongoose_1.connect)(uri).then(() => {
            console.log("connected to database");
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.dbConfig = dbConfig;
