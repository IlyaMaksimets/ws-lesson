import { useState, useEffect, useContext } from "react";
import '../styles/HomePage.css';
import Message from '../elements/Message.js'
import {Context} from "../../contexts.js"

function sendMessage(message){
    console.log(message);
}

export default function HomePage({socket}) {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [messages, setMessages] = useState([]);
    const [actualMessage, setActualMessage] = useState();
    const {token} = useContext(Context);

    useEffect(()=>{
        console.log(token)
    }, [token])

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onMsgEvent(value) {
            setMessages(m => [...m, value]);
            sendMessage(value);
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
    <>
        <input type="text" value={actualMessage} onChange={(event) => setActualMessage(a => event.target.value)}/>
        <button className="submitButton" onClick = {() => {
            setActualMessage(a => actualMessage);
            socket.emit('msg', actualMessage);
            console.log(messages);
        }
        }
        >Submit
        </button>
        {messages.map((msg) => <Message msg={msg}/>)}
    </>
    );
}