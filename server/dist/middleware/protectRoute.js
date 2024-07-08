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
exports.protectRoute = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../model/userModel"));
const protectRoute = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.jwToken;
        if (!token) {
            return res.status(401).json({
                message: "token not found",
            });
        }
        const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            return res.status(401).json({
                message: "unauthorized token",
            });
        }
        const user = yield userModel_1.default.findById(decode.userId).select("-password");
        if (!user) {
            return res.status(401).json({
                message: "user not found",
            });
        }
        // console.log("user", user);
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(500).json({
            error: "error in protect route",
        });
    }
});
exports.protectRoute = protectRoute;
