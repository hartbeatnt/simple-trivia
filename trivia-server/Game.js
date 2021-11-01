class Game {
    constructor() {
        this.players = {}
        this.host = null
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
}

class Player {
    constructor(name) {
        this.name = name
        this.score = 0
    }
}

export default Game