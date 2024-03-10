import {useState, useEffect} from "react";
import '../styles/HomePage.css';
import Message from '../elements/Message.js';

export default function HomePage({socket, token, messages, setMessages}) {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [actualMessage, setActualMessage] = useState();
    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onMsgEvent(value) {
            setMessages(m => [...m, {token: value.token, msg: value.msg, time: value.time, isMine: value.token == token}]);
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
            <div className="inputcont">
                <input type="text" value={actualMessage}
                       onChange={(event) => setActualMessage(event.target.value)}/>
                <button className="submitButton" onClick={() => {
                    socket.emit('msg', {msg: actualMessage, token});
                }
                }
                >Submit
                </button>
            </div>
            {messages.map((value) => <Message value={value}/>)}
        </>
    );
}