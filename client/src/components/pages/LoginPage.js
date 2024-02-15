import { useState, useEffect, useContext } from "react";
import '../styles/LoginPage.css';
import {Context} from "../../contexts.js"

export default function LoginPage({socket}) {
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();
    const [isConnected, setIsConnected] = useState(socket.connected);
    const {setToken} = useContext(Context);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onGetTokenEvent(value) {
            console.log(value);
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
            window.location.href = "http://localhost:3000/home";
        }
        }
        >Submit</button>
    </>
    );
}