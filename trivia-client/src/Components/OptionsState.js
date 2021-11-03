import { useState } from 'react'
import "./OptionsState.css"
import QuestionState from './QuestionState'

function OptionsState(props) {
    const options = props.data.options ?? {}
    const [submitted, setSubmitted] = useState()

    function submitAnswer(index) {
        setSubmitted(index)
        props.socket.emit("submit", props.data.index, index)
    }

    return (
        <div className="OptionsState">
            <QuestionState  data={ props.data} socket={ props.socket } />
            <div className="OptionsState_options">
                {!isNaN(submitted)
                    ? <p>{ `You guessed "${ options[submitted] }"` }</p>
                    : (<div> {
                            props.data.options && props.data.options.map((option, index) => (
                                <button onClick={ () => submitAnswer(index) }>
                                    { `${ alphabet[index] } - ${ option }` }
                                </button>
                            ))
                        }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase()

export default OptionsState
