import './App.css';
import { useState, useEffect } from 'react';
import io from "socket.io-client";
import { AuthState, HostState, LobbyState, OptionsState, QuestionState, ResultsSate, ScoreBoardState } from './Components'

const socket = io()

function Switch(isHost, state, data) {
  const withDataAndSocket = (Component, props) => <Component data={ data } socket={ socket } { ...props } />
  if (isHost) return withDataAndSocket(HostState, { state: state })
  return {
    auth: withDataAndSocket(AuthState),
    lobby: withDataAndSocket(LobbyState),
    question: withDataAndSocket(QuestionState),
    options: withDataAndSocket(OptionsState),
    results: withDataAndSocket(ResultsSate),
    scores: withDataAndSocket(ScoreBoardState)
  }[state]
}

function App() {
  const [isHost, setIsHost] = useState(false)
  const [state, setState] = useState(STATE.auth)
  const [data, setData] = useState(null)


  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket connected", socket.id)
    });
    socket.on("disconnect", () => {
      console.log("socket disconnected", socket.id)
    });
    socket.on("state", (state, data) => {
      setData(data)
      setState(state)
      if (state === "host") {
        setIsHost(true)
      }
    });
    socket.on("data", (data) => {
      setData(data)
    });
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        NLP Trivia
      </header>
      <div className="App-body">{ Switch(isHost, state, data) }
      </div>
    </div>
  );
}

const STATE = {
  auth: "auth",
  lobby: "lobby",
  question: "question",
  options: "options",
  results: "results",
  scores: "scores",
  done: "done",
  host: "host"
}

export default App;
