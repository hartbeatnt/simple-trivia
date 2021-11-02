import { useState } from 'react'
import "./OptionsState.css"
import QuestionState from './QuestionState'

function OptionsState(props) {
    const [submitted, setSubmitted] = useState(null)

    function submitAnswer(index) {
        setSubmitted(index)
        props.socket.emit("submit", props.data.index, index)
    }

    return (
        <div className="OptionsState">
            <QuestionState  data={ props.data} socket={ props.socket } />
            <div className="OptionsState_options">
                {submitted
                    ? <p>{ `You guessed "${ props.data.options[submitted] }"` }</p>
                    : (<ol> {
                            props.data.options && props.data.options.map((option, index) => (
                                <button onClick={ () => submitAnswer(index) }>
                                    { `${ alphabet[index] } - ${ option }` }
                                </button>
                            ))
                        }
                        </ol>
                    )
                }
            </div>
        </div>
    )
}

const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase()

export default OptionsState
