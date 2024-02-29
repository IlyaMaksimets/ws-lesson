import { useState, useEffect } from "react";
import '../styles/HomePage.css';
import Message from '../elements/Message.js';

export default function HomePage({socket, login}) {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [messages, setMessages] = useState([]);
    const [actualMessage, setActualMessage] = useState();

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
            emit('get-all-msg');
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onMsgEvent(value) {
            setMessages(m => [...m, {msg: value.msg, login: value.login, time: value.time}]);
            console.log({msg: value.msg, login: value.login, time: value.time})
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('new-msg', onMsgEvent);
        socket.on('all-msg', onAllMsgEvent);
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
            setActualMessage(actualMessage);
            socket.emit('msg', {msg: actualMessage, login});
        }
        }
        >Submit
        </button>
        </div>
        {messages.map((value) => <Message value={value} login={login}/>)}
    </>
    );
}