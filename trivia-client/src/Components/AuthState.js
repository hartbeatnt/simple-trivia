import axios from "axios";
import { useState } from 'react';
import './AuthState.css';

function AuthState(props) {
    const [name, setName] = useState("")
    const onSubmit = () => {
        props.socket.emit("join", name)
        // axios.post(`http://localhost:1337/join`, {
        //     name
        // }); 
    }
    return (
        <div className="AuthState">
            <p>Please enter your name:</p>
            <input value={ name } onChange={ e => setName(e.target.value) } />
            <br />
            <button onClick={ onSubmit }>
                Join Game
            </button>
        </div>
    )
}

export default AuthState