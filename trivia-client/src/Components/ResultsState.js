import './ResultsState.css';
import './OptionsState';
import QuestionState from './QuestionState'

function ResultsState(props) {
    const { answer, options } = props.data
    return (
        <div>
            <QuestionState data={ props.data} socket={ props.socket } />
            <div className="ResultsState">
                <div>{ alphabet[answer] }</div>
                <p>{ `${options[answer]}` }</p>
            </div>
        </div>
    )
}

const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase()
export default ResultsState