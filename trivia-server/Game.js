import questions from './Question.js';

class Game {
    constructor() {
        this.players = {}
        this.host = null
        this.questions = questions
        this.currentQuestion = 0
    }

    addHost(socketId) {
        if (!this.host) {
            this.host = socketId
            return true
        }
        return false
    }

    createPlayer(name, socketId) {
        let player = new Player(name)
        this.players[socketId] = player
        console.log(this.players)
    }

    getPlayers() {
        return Object.keys(this.players).map(id => this.players[id])
    }

    getCurrentPropmt() {
        return {
            prompt: this.questions[this.currentQuestion].prompt,
        }
    }

    getCurrentOptions() {
        return {
            prompt: this.questions[this.currentQuestion].prompt,
            options: this.questions[this.currentQuestion].options
        }
    }

    submitAnswer(playerId, question, answer) {
        if (question !==  this.currentQuestion) { return }
        if (answer === this.questions[this.currentQuestion].answer) {
            players[playerId].numCorrect += 1
            players[playerId].streak += 1
        } else {
            players[playerId].streak = 0
        }
    }
}

class Player {
    constructor(name) {
        this.name = name
        this.score = 0
        this.numCorrect = 0
        this.streak = 0

    }
}

export default Game