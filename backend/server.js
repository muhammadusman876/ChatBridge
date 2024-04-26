const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser")

const authRoutes = require("./routes/auth.js");
const messageRoutes = require("./routes/message.js")
const userRoutes = require("./routes/user.js");

const connectToMongoDB = require("./db/connectToMongoDB.js");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


//Middlewares
//Will be used to parse the incoming requests with JSON payloads (from req.body)
//will help extract fields from req.body
app.use(express.json());
app.use(cookieParser()) // to parse the incoming cookies from req.cookies

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);



app.listen(port,() => {
    connectToMongoDB();
    console.log(`Server Running on port ${port}`);
});