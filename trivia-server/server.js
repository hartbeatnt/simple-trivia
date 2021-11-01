import http from "http";
import express from "express";
import cors from "cors";
import Game from "./Game.js"

// initializations
const app = express();
const server = http.createServer(app);
const game = new Game();

// middleware
app.use(cors({ origin: process.env.CLIENT_URI }));
app.get("/join", (req, res) => {
    console.log(res.body)
})

// listen
const port = 1337;

server.listen(port, () => {
  console.log(`trivia server listening on port ${port}`);
});