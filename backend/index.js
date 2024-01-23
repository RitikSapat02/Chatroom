const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://chatroom-client-seven.vercel.app",
    methods: ["GET", "POST"],
  },
});

// server-side
io.on("connection", (socket) => {
  // console.log(socket.id);

  socket.on("joinRoom", (room) => socket.join(room)); //"joinRoom" iss me same name likhana jo bhi frontend ke emit me likhoge. socket.join se user join hojaega

  socket.on("newMessage", ({ newMessage, room }) => {
    console.log(room, newMessage);

    //send to all clients in room
    io.in(room).emit("getLatestMessage", newMessage);
  });
});

server.listen(8000, () => console.log("app started at port 8000"));
