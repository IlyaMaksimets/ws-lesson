import {useState, useEffect} from "react";
import '../styles/ChatHidden.css';

export default function ChatHidden({state, dispatch, chatInfo}) {
    const [pong, setPong] = useState(false);
    return (
        <>
            <div className="chatHidden">
                <h>{chatInfo.chatType}:{chatInfo.chatName}</h>
                <h>{chatInfo.author}:{chatInfo.actualMessage.text} --- {chatInfo.actualMessage.time}</h>
                <button className="chatButton" onClick={() => {
                    setPong(true);
                    dispatch({"type": "change_current_chat", chat: { "chatId": chatInfo.chatId, "chatType": chatInfo.chatInfo, "chatName": chatInfo.chatName, "actualMessage": chatInfo.actualMessage, "author": chatInfo.author}})
                }}>Open<button>
            </div>
            {pong && <Navigate to="/chat" replace={true}/>}
        </>
    );
}