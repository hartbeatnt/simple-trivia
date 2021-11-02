const questions = require('./Question.js');

class Game {
    constructor() {
        this.players = {}
        this.host = null
        this.questions = questions
        this.currentQuestion = 0
    }

    addHost(id) {
        if (!this.host) {
            this.host = id
            return true
        }
        return false
    }

    createPlayer(name, id) {
        let player = new Player(name)
        this.players[id] = player
        console.log(this.players)
    }

    removePlayer(id) {
        if (id === this.host) {
            console.log('** host left')
            this.host = null
        } else {
            delete this.players[id]
            console.log('** player left')
        }
    }

    getPlayers() {
        return Object.keys(this.players).map(id => this.players[id])
    }

    getCurrentPrompt() {
        return this.questions[this.currentQuestion].prompt
    }

    getCurrentOptions() {
        return this.questions[this.currentQuestion].options;
    }

    getCurrentAnswer() {
        return this.questions[this.currentQuestion].answer;
    }

    submitAnswer(id, question, answer) {
        console.log(id, question, this.currentQuestion, answer, this.getCurrentAnswer())
        if (!this.players[id]) { return }
        if (question !==  this.currentQuestion) { return }
        if (answer === this.questions[this.currentQuestion].answer) {
            this.players[id].numCorrect += 1
            this.players[id].streak += 1
            this.players[id].score += this.players[id].streak
        } else {
            this.players[id].streak = 0
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

module.exports = Game