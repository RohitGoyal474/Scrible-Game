import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [username, setUsername] = useState("");
    const navigate=useNavigate()
    return (
        <div>
            <input
                type="text"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
            ></input>
            <button
                onClick={() => {
               
                  navigate("/game", { state: username });
                }}
            >
                login
            </button>
        </div>
    )
}