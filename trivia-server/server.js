import http from "http";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import Game from "./Game.js"

// initializations
const app = express();
const server = http.createServer(app);
const game = new Game();


// middleware
app.use(cors());
app.use(express.json());

// socket
const io = new Server(server, {
    cors: { origin: "http://localhost:3000" }
})
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('join', (name) => {
        if (name === "host") {
            if (game.addHost(socket.id)) {
                socket.emit("state", "host", game.getPlayers())
            } else {
                socket.emit("error", "host")
            }
        } else {
            game.createPlayer(name, socket.id)
            socket.emit("state", "lobby", game.getPlayers())
            io.emit("players", game.getPlayers())
        }
    })
});

// listen
const port = 1337;

server.listen(port, () => {
  console.log(`trivia server listening on port ${port}`);
});