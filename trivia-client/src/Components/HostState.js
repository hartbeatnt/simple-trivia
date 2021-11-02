import "./HostState.css"

function HostState(props) {
    const { socket, state, data } = props
    console.log(data)
    return (
        <div className="HostState">
            <div className="HostState_list">
                <button onClick={() => {
                    props.socket.emit("start")
                }}> start </button>

                <button onClick={() => {
                    props.socket.emit("options")
                }}> display options </button>

                <button onClick={() => {
                    props.socket.emit("results")
                }}> show result </button>

                <button onClick={() => {
                    props.socket.emit("next")
                }}> next question </button>

                <button onClick={() => {
                    props.socket.emit("scores")
                }}> show scores </button>
            </div>
            <div className="HostState_data">
                {props.data.prompt}
                <ol type="A">
                    { props.data.options
                        && props.data.options.map(option => (
                            <li>{option}</li>)
                        )
                    }
                </ol>
                { props.data.options && !isNaN(props.data.answer)
                    && <p>{ props.data.options[props.data.answer] }</p>
                }
            </div>
        </div>
    )
}

export default HostState
