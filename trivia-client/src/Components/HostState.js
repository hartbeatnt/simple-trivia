import "./HostState.css"

function HostState(props) {
    const { socket } = props
    const handleClick = () => {
        props.socket.emit("start")
    }
    return (
        <div className="HostState">
            <button onClick={ handleClick }>
                start
            </button>
        </div>
    )
}

export default HostState
