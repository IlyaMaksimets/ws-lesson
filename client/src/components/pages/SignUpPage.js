import '../styles/LoginPage.css';
import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";

export default function LoginPage({socket, setLogin, login}) {
    const [password, setPassword] = useState();
    const [passwordConfirmation, setPasswordConfirmation] = useState();
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [pong, setPong] = useState(false)

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onAuthUserEvent(value) {
            setPong(true);
            setLogin(value.login);
        }

        function onErrorEvent() {
            setPong(false);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('auth-user-success', onAuthUserEvent);
        socket.on('error', onErrorEvent);
        socket.connect();

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('auth-user-success', onAuthUserEvent);
            socket.off('error', onErrorEvent);
            socket.disconnect();
        };
    }, [socket]);

    return (
    <>
        <input type="text" value={login} onChange={(event) => setLogin(event.target.value)}/>
        <input type="text" value={password} onChange={(event) => setPassword(event.target.value)}/>
        <input type="text" value={passwordConfirmation} onChange={(event) => setPasswordConfirmation(event.target.value)}/>
        <button className="submitButton" onClick = {() => {
            socket.emit('auth-user', {login, password, passwordConfirmation});
        }
        }
        >Submit</button>
        {pong && <Navigate to="/home" replace={true}/>}
    </>
    );
}