const http = require("http");
const express = require("express");
const cors = require("cors");
const path = require("path");
const Io = require("socket.io");
const Game = require("./Game.js");

// initializations
const app = express();
const server = http.createServer(app);
const game = new Game();


// middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../trivia-client/build")));

// routes
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../trivia-client/build', 'index.html'));
});

// socket
const io = Io(server, {
    cors: { origin: "http://localhost:3000" }
})

io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);

    //
    socket.on("disconnect", () => {
        console.log('a user diconnected:', socket.id)
        game.removePlayer(socket.id)
    }),

    // Client Functions
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
    socket.on('submit', (question, answer) => {
        console.log('player answered question:', { player: socket.id, question, answer })
        game.submitAnswer(socket.id, question, answer)
    })

    // Host functions
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
        io.sockets.sockets.forEach(socket => {
            socket.emit("state", "results", {
                index: game.currentQuestion, 
                prompt: game.getCurrentPrompt(),
                options: game.getCurrentOptions(),
                answer: game.getCurrentAnswer(),
                streak: game.players[socket.id]?.streak,
            })
        })
    })
    socket.on('next', () => {
        if (game.currentQuestion + 1 >= game.questions.length) {
            return
        }
        game.currentQuestion += 1
        io.emit("state", "question", {
            index: game.currentQuestion, 
            prompt: game.getCurrentPrompt()
        })
    })
    socket.on('scores', () => {
        io.emit("state", "scores", game.getPlayers().sort((a,b) => b.score - a.score))
    })
});

// listen
const port = 1337;

server.listen(port, () => {
  console.log(`trivia server listening on port ${port}`);
});