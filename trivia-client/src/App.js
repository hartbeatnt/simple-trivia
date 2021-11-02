import './App.css';
import { useState, useEffect } from 'react';
import io from "socket.io-client";
import { AuthState, HostState, LobbyState, OptionsState, QuestionState, ResultsSate } from './Components'

const socket = io("http://localhost:1337", {
  withCredentials: false,
})

function Switch(isHost, state, data) {
  if (isHost) return <HostState state={ state } data={ data } socket={ socket } />
  return {
    auth: <AuthState data={ data } socket={ socket } />,
    lobby: <LobbyState data={ data } socket={ socket } />,
    question: <QuestionState data={ data } socket={ socket } />,
    options: <OptionsState data={ data } socket={ socket } />,
    results: <ResultsSate data={ data } socket={ socket } />,
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
