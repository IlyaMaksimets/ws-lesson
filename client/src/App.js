import './App.css';
import { io } from 'socket.io-client';
import { useState, useEffect } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./components/pages/LoginPage.js";
import SignUpPage from "./components/pages/SignUpPage.js";
import HomePage from "./components/pages/HomePage.js";

const socket = io("");


function App() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [token, setToken] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        function onConnect() {
            setIsConnected(i => true);
        }

        function onDisconnect() {
            setIsConnected(i => false);
        }

        function onFooEvent(value) {
            console.log(value)
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.connect();

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.disconnect()
        };
    }, [socket]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<HomePage token={token} socket={socket} messages={messages} setMessages={setMessages}/>}/>
                <Route path="/login" element={<LoginPage token={token} setToken={setToken} socket={socket} messages={messages} setMessages={setMessages}/>}/>
                <Route path="/register" element={<SignUpPage token={token} setToken={setToken} socket={socket} setMessages={setMessages}/>}/>
            </Routes>
        </BrowserRouter>
    );

}

export default App;
