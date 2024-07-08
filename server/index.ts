import express, { Application } from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";
import cors from "cors";
import { createServer } from "http";
import { mainApp } from "./mainApp";
import { dbConfig } from "./utils/mainConnection";
import cookieParser from "cookie-parser";

dotenv.config();
const port = parseInt(process.env.PORT!);
const app: Application = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

mainApp(app);

dbConfig();

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

process.on("uncaughtException", (err: Error) => {
  console.log("uncaughtException: " + err);
  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("unhandledRejection: " + reason);
  server.close(() => {
    process.exit(1);
  });
});
