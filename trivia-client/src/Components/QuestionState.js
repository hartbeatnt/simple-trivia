import "./QuestionState.css"

function QuestionState(props) {
    return (
        <div className="QuestionState">
            { props.data.prompt }
        </div>
    )
}

export default QuestionState