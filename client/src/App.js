import './App.css';
import { io } from 'socket.io-client';
import { useState, useEffect } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./components/pages/LoginPage.js";
import HomePage from "./components/pages/HomePage.js";

const socket = io("localhost:5000");


function App() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [token, setToken] = useState("---");

    useEffect(()=>{
        console.log(token)
    }
    ,[token])

    useEffect(()=>{
            console.log("mount")
        }
        ,[])

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


    function handleToken(value){
        console.log(value)
        setToken(v => value)
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<HomePage token={token} socket={socket}/>}/>
                <Route path="/login" element={<LoginPage setToken={handleToken} socket={socket}/>} />
            </Routes>
        </BrowserRouter>
    );

}

export default App;
