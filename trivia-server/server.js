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
            io.emit("data", game.getPlayers())
        }
    })
    socket.on('start', () => {
        if (socket.id != game.host) return
        io.emit("state", "question", {
            index: game.currentQuestion, 
            prompt: game.getCurrentPrompt()
        })
    })
    socket.on('options', () => {
        if (socket.id != game.host) return
        io.emit("state", "options", {
            index: game.currentQuestion, 
            prompt: game.getCurrentPrompt(),
            options: game.getCurrentOptions()
        })
    })
    socket.on('results', () => {
        if (socket.id != game.host) return
        io.sockets.forEach(socket => {
            socket.emit("state", "results", {
                index: game.currentQuestion, 
                prompt: game.getCurrentPrompt(),
                options: game.getCurrentOptions(),
                answer: game.getCurrentAnswer(),
                streak: game.players[socket.id].streak,
            })
        })
        // io.emit("state", "results", {
        //     index: game.currentQuestion, 
        //     prompt: game.getCurrentPrompt(),
        //     options: game.getCurrentOptions(),
        //     answer: game.ge
        // })
    })
});

// listen
const port = 1337;

server.listen(port, () => {
  console.log(`trivia server listening on port ${port}`);
});