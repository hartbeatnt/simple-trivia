import './App.css';
import { useState } from 'react';
import AuthState from './Components/AuthState'

function App() {
  const [state, setState] = useState(STATE.auth)
  const [user, setUser] = useState("")

  const display = state => ({
    auth: <AuthState />
  }[state])
  
  return (
    <div className="App">
      <header className="App-header">
        NPL Trivia
      </header>
      <div className="App-body">
        { display(state) }
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
