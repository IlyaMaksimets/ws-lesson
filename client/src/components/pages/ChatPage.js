import {useState, useEffect} from "react";
import '../styles/ChatOpened.css';
import Message from '../elements/Message.js';

export default function ChatPage({state, dispatch}) {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [messages, setMessages] = useState();
    const [actualMessage, setActualMessage] = useState();
    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
            fetch(url('/get_messages'), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({token}).then(data => {
                    if (data.status === 200) {
                        setChats(data.chats)
                    }
                })
            })
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