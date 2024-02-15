import './App.css';
import { io } from 'socket.io-client';
import { useState, useEffect } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./components/pages/LoginPage.js";
import HomePage from "./components/pages/HomePage.js";
import {Context} from "./contexts.js"

const socket = io("localhost:5000");


function App() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [token, setToken] = useState("---");

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
    <Context.Provider value={{token, setToken: t=>setToken(t)}}>
        <BrowserRouter>
            <Routes>

                <Route path="/home" element={<HomePage socket={socket}/>}/>
                <Route path="/login" element={<LoginPage socket={socket}/>} />

            </Routes>
        </BrowserRouter>
        </Context.Provider>
    );

}

export default App;
