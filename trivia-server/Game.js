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
    }

    removePlayer(id) {
        if (id === this.host) {
            this.host = null
        } else {
            delete this.players[id]
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
        if (!this.players[id]) { return }
        if (question !==  this.currentQuestion) { return }
        if (answer === this.questions[this.currentQuestion].answer) {
            this.players[id].score += 1
            this.players[id].numCorrect += 1
            this.players[id].streak += 1
            if (this.players[id].streak > this.players[id].longestStreak) {
                this.players[id].longestStreak = this.players[id].streak
            }
        } else {
            this.players[id].score -= 0.2
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
        this.longestStreak = 0
    }
}

module.exports = Game