import './App.css';
import { useState, useEffect } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./components/pages/LoginPage.js";
import SignUpPage from "./components/pages/SignUpPage.js";
import HomePage from "./components/pages/HomePage.js";

function App() {
    const [state, dispatch] = useReducer(reducer, fillState);
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        function onConnect() {
            setIsConnected(i => true);
        }

        function onDisconnect() {
            setIsConnected(i => false);
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
                <Route path="/home" element={<HomePage state={state} dispatch={dispatch}/>}/>
                <Route path="/login" element={<LoginPage state={state} dispatch={dispatch}/>}/>
                <Route path="/register" element={<SignUpPage state={state} dispatch={dispatch}/>}/>
            </Routes>
        </BrowserRouter>
    );

}

export default App;
