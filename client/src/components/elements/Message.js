import { useState, useEffect } from "react";
import '../styles/HomePage.css';

export default function Message({ msg }){
    return(
        <>
            <p>{msg}</p>
        </>
    )
}