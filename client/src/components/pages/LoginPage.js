import '../styles/LoginPage.css';
import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";

export default function LoginPage({socket, setToken}) {
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [pong, setPong] = useState(false)

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onGetTokenEvent(value) {
            setPong(true)
            setToken(value);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('get-token', onGetTokenEvent);
        socket.connect();

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('get-token', onGetTokenEvent);
            socket.disconnect();
        };
    }, [socket]);

    return (
    <>
        <input type="text" value={login} onChange={(event) => setLogin(event.target.value)}/>
        <input type="text" value={password} onChange={(event) => setPassword(event.target.value)}/>
        <button className="submitButton" onClick = {() => {
            socket.emit('get-token');
            setLogin(login);
            setPassword(password);
        }
        }
        >Submit</button>
        {pong && <Navigate to="/home" replace={true}/>}
    </>
    );
}