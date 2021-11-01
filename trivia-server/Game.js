class Game {
    constructor() {
        this.players = {}
    }

    createPlayer(name, socketId) {
        let player = new Player(name)
        this.players[socketId] = player
        console.log(this.players)
    }
}

class Player {
    constructor(name) {
        this.name = name
        this.score = 0
    }
}

export default Game