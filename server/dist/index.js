"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const mainApp_1 = require("./mainApp");
const mainConnection_1 = require("./utils/mainConnection");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const port = parseInt(process.env.PORT);
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});
(0, mainApp_1.mainApp)(app);
(0, mainConnection_1.dbConfig)();
io.on("connection", (socket) => {
    console.log("A user connected: " + socket.id);
    // Join the user to their own room using their userId
    socket.on("joinRoom", (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined room ${userId}`);
    });
    socket.on("sendMessage", (data) => {
        const { participant } = data;
        const [senderId, receiverId] = participant;
        console.log("Message received on server:", data);
        // Emit the message only to the rooms of the sender and receiver
        socket.to(senderId).to(receiverId).emit("receiveMessage", data);
    });
    socket.on("disconnect", () => {
        console.log("A user disconnected: " + socket.id);
    });
});
server.listen(port, () => {
    console.log("server is running on port ", port);
});
process.on("uncaughtException", (err) => {
    console.log("uncaughtException: " + err);
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
    console.log("unhandledRejection: " + reason);
    server.close(() => {
        process.exit(1);
    });
});
