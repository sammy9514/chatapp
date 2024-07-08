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
exports.getAllUser = exports.logout = exports.login = exports.signup = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken_1 = require("../utils/generateToken");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, userName, password, gender } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const maleAvatar = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const femaleAvatar = `https://avatar.iran.liara.run/public/girl?username=${userName}`;
        const user = yield userModel_1.default.create({
            name,
            userName,
            password: hashedPassword,
            gender,
            avatar: gender === "male" ? maleAvatar : femaleAvatar,
        });
        (0, generateToken_1.generateToken)(user._id, res);
        return res.status(201).json({
            message: "user created",
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "error in signup",
        });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password } = req.body;
        const findUser = yield userModel_1.default.findOne({ userName });
        if (!findUser) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        const comparePassword = yield bcrypt_1.default.compare(password, findUser.password);
        if (!comparePassword) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }
        (0, generateToken_1.generateToken)(findUser === null || findUser === void 0 ? void 0 : findUser._id, res);
        return res.status(200).json({
            message: "Logged in",
            data: findUser,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error in login",
        });
    }
});
exports.login = login;
const logout = (req, res) => {
    try {
        res.cookie("jwToken", "", {
            maxAge: 0,
        });
        return res.status(200).json({ message: "logged out" });
    }
    catch (error) {
        res.status(500).json({
            message: "failed to logout",
        });
    }
};
exports.logout = logout;
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = yield userModel_1.default
            .find({
            _id: { $ne: loggedInUserId },
        })
            .select("-password");
        return res.status(200).json(filteredUsers);
    }
    catch (error) {
        //console.error("Error in getUsersForSidebar: ", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.getAllUser = getAllUser;
