import "dotenv/config";
import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "İYİMİSİN API V1.0",
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

export default app;
