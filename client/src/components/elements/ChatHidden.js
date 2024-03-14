import {useState, useEffect} from "react";
import '../styles/ChatHidden.css';

export default function ChatHidden({type, name, actualMessage, author}) {
    const [status, setStatus] = useState("unread");
    useEffect(() => {
        setStatus("unread");
    }, [actualMessage])
    return (
        <>
            <div className="chatHidden">
                <h>{type}:{name}</h>
                <h>{author}:{actualMessage.text} --- {actualMessage.time}</h>
                <button className="chatButton" onClick={() => {
                    setStatus("read");
                }}>Open<button>
            </div>
        </>
    );
}