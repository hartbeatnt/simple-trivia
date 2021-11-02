import './ResultsState.css';
import './OptionsState';
import QuestionState from './QuestionState'

function ResultsState(props) {
    const answer = props.data?.answer
    const options = props.data?.options ?? {}

    return (
        <div>
            <h3 className="ResultsState_header">Question {props.data.index + 1}</h3>
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