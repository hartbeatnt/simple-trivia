import "./ScoreBoardState.css"

function ScoreBoardState(props) {
    let players = Array.isArray(props.data) ? props.data : []

    return (
        <div className="ScoreBoardState">
           <h1>Top Scores</h1>
           <table>
               <tr>
                   <td>Name</td>
                   <td>Total Score</td>
                   <td>Correct Answers</td>
                   <td>Longest Streak</td>
               </tr>
               {
                   players.map(player => (
                       <tr>
                           <td>{ player.name }</td>
                           <td>{ player.score }</td>
                           <td>{ player.numCorrect }</td>
                           <td>{ player.longestStreak }</td>
                       </tr>
                   ))
               }
           </table>
        </div>
    )
}

export default ScoreBoardState