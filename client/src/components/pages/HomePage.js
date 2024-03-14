import {useState, useEffect} from "react";
import '../styles/HomePage.css';
import Message from '../elements/Message.js';

export default function HomePage({socket, token}) {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [chats, setChats] = useState([]);
    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onMsgEvent(value) {
            //...
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
            {chats.map((chat) => <ChatHidden type=chat.type name=chat.name actualMessage= author=/>)}
        </>
    );
}