import { Server } from "socket.io"; // Destructure Server class
import http from "http";
import express from "express"; // Import Express

const app = express(); // Create the Express app instance

//Here we have added Socket server on top on express server
//here we http server and pass our express into it
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["https://chatbridge-2.onrender.com"],
    methods: ["GET", "POST"],
  },
});

//here we will pass the receiverId i.e userId
const getReceiverSocketId = (receiverId) => {
  //that will give us user socketId when we pass this receiverId
  return userSocketMap[receiverId];
};

//to show user online status
const userSocketMap = {}; //{userId:socketId}

//here you will listen to the socket
// here the parameter "socket" will be the user and it will have id and different properties, but most of the time we will use id.
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  //to get that userId we got into query
  const userId = socket.handshake.query.userId;
  if (userId != "undefined") userSocketMap[userId] = socket.id;

  //now that we have this userSocketMap we would send an event to all connect clients for that we use io.emit
  // so whenever we connect this would send who is online and offline, we can grab that event with getOnlineUsers
  //you can give any name
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  //socket.on() is used to listen to the events, it can be used both on client and server side
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    //when user disconnect we delete it from userSocketMap
    delete userSocketMap[userId];
    // since now our userSocketMap updated we would send that to all client
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server, getReceiverSocketId };
