import "./LobbyState.css";

function getTextFromPlayers(array) {
    if (array.length === 1) {
        return "You are the first player to join"
    } else {
        return `${array.length} players have joined so far`
    }
}

function LobbyState(props) {
    return (
        <div className="LobbyState">
            <p>Waiting for the host to start the game...</p>
            <p> { getTextFromPlayers(props.data) }</p>
        </div>
    )
}

export default LobbyState