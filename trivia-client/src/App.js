import './App.css';
import { useState, useEffect, useMemo } from 'react';
import io from "socket.io-client";
import { AuthState, HostState, LobbyState } from './Components'

const socket = io("http://localhost:1337", {
  withCredentials: false,
})

function Switch(state, data) {
  return {
    auth: <AuthState data={ data } socket={ socket } />,
    host: <HostState data={ data } socket={ socket } />,
    lobby: <LobbyState data={ data } socket={ socket } />
  }[state]
}

function App() {
  const [state, setState] = useState(STATE.auth)
  const [data, setData] = useState(null)


  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket connected", socket.id)
    });
    socket.on("state", (state, data) => {
      console.log(state, data)
      setData(data)
      setState(state)
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
      <div className="App-body">
        { Switch(state, data) }
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
