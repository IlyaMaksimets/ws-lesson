import '../styles/LoginPage.css';
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import url from '../../utils.js'

export default function LoginPage({state, dispatch}) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [pong, setPong] = useState(false)

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onErrorEvent() {
            setPong(false);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('error', onErrorEvent);
        socket.connect();

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('error', onErrorEvent);
            socket.disconnect();
        };
    }, [socket]);

    return (
    <>
        <input type="text" value={login} onChange={(event) => setLogin(event.target.value)}/>
        <input type="text" value={password} onChange={(event) => setPassword(event.target.value)}/>
        <button className="submitButton" onClick = {() => {
            fetch(url('/login'), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({login, password})
            }).then(response => response.json()).then(data => {
                if (data.status === 200) {
                    dispatch({"type": "user_auth", "token": data.token, "actualMessages": data.actualMessages})
                    setPong(true);
                }
            })
        }
        }
        >Submit</button>
        {pong && <Navigate to="/home" replace={true}/>}
    </>
    );
}