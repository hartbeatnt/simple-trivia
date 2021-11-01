import "./OptionsState.css"
import QuestionState from './QuestionState'

function OptionsState(props) {
    return (
        <div className="OptionsState">
            <QuestionState  data={ props.data} socket={ props.socket } />
            <div className="OptionsState_options">
                { props.data.prompt }
                <ol>
                {
                    props.data.options && props.data.options.map(option => (
                        <button>{ option }</button>
                    ))
                }
                </ol>
            </div>
        </div>
    )
}

export default OptionsState
