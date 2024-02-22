import { useState, useEffect, useContext } from "react";
import '../styles/HomePage.css';
import Message from '../elements/Message.js';

export default function HomePage({socket, token}) {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [messages, setMessages] = useState([]);
    const [actualMessage, setActualMessage] = useState();

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onMsgEvent(value) {
        console.log(value);
        console.log(messages);
        setMessages(m => [...m, {msg: value.actualMessage, isMine: token === value.token, time: value.time}]);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('new-msg', onMsgEvent);
        socket.connect();

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('new-msg', onMsgEvent);
            socket.disconnect()
        };
    }, [socket]);

    return (
    <><div className="inputcont">
        <input type="text" value={actualMessage} onChange={(event) => setActualMessage(a => event.target.value)}/>
        <button className="submitButton" onClick = {() => {
            setActualMessage(a => actualMessage);
            socket.emit('msg', {actualMessage, token});
        }
        }
        >Submit
        </button>
        </div>
        {messages.map((value) => <Message value={value}/>)}
    </>
    );
}