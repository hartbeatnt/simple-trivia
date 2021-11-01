import './App.css';
import { useState, useEffect, useMemo } from 'react';
import io from "socket.io-client";
import AuthState from './Components/AuthState'

const socket = io("http://localhost:1337", {
  withCredentials: false,
})

function Switch(state) {
  return {
    auth: <AuthState socket={ socket } />
  }[state]
}

function App() {
  const [state, setState] = useState(STATE.auth)
  const [user, setUser] = useState("")


  useEffect(() => {
    socket.on("update", (res) => {
      console.log(res)
    });
    socket.on("connect", () => {
      console.log("socket connected", socket.id)
    })
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        NPL Trivia
      </header>
      <div className="App-body">
        { Switch(state) }
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
  done: "done"
}

export default App;
