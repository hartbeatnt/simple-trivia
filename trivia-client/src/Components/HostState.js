import "./HostState.css"

function HostState(props) {
    const { socket } = props
    return (
        <div className="HostState">
            <button>start</button>
        </div>
    )
}

export default HostState
