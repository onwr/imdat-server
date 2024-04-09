const express = require("express");
const http = require("http");
require("dotenv");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "Hello",
  });
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Kullanıcı bağlandı", socket.id);

  socket.on("ihbar", (donen) => {
    console.log("Yeni ihbar", donen);

    io.emit("imdat", donen);
  });
});

server.listen(process.env.PORT || 1881, () => {
  console.log("Server ayağa kaldırıldı.");
});
