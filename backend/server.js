const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.js");
const messageRoutes = require("./routes/message.js");
const userRoutes = require("./routes/user.js");

const connectToMongoDB = require("./db/connectToMongoDB.js");
const { app, server } = require("./socket/socket.js");

const port = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();

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
// app.use(express.static(path.join(__dirname, "../frontend/dist")))

// //any routes other than mentioned above
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname,"..", "frontend", "dist", "index.html"))
// })

// app.use(express.static(path.join(__dirname, "../frontend/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
// });

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
});
//this is coming from socket server
server.listen(port, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${port}`);
});
