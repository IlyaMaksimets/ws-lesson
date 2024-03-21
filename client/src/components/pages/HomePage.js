import {useState, useEffect} from "react";
import '../styles/HomePage.css';
import Message from '../elements/Message.js';

export default function HomePage({state, dispatch}) {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [chats, setChats] = useState([]);
    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
            fetch(url('/get_chats'), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({state.token}).then(data => {
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
            setChats(c => {
                c[value.chat_id].actualMsg = value.msg
            })
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
            {
            chats.map((chat) => <ChatHidden state={state} dispatch={dispatch} chatInfo={{"chatId": chat.id,
                                                                                        "chatType": chat.type,
                                                                                        "chatName": chat.name,
                                                                                        "actualMessage": chat.actualMessage,
                                                                                        "author": chat.author}}/>)}
            }
        </>
    );
}