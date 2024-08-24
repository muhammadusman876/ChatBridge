import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.js";
import userRoutes from "./routes/user.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

const port = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();

console.log(`Node start command: node ${process.argv[1]}`);

//Middlewares
//Will be used to parse the incoming requests with JSON payloads (from req.body)
//will help extract fields from req.body
app.use(express.json());
app.use(cookieParser()); // to parse the incoming cookies from req.cookies

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

//with app.use and get we are able to run our frontend from server
// this is used to serve static files such as html css js image file sound file etc
// path.join gives absolute path to the root folder
//we basically going into __dirname(which root) then frontend / dist
app.use(
  express.static(path.join(__dirname, ".", "Chat", "..", "frontend/dist"))
);

//any routes other than mentioned above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
});
//this is coming from socket server
server.listen(port, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${port}`);
});
