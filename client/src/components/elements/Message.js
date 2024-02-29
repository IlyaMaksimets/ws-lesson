import { useState, useEffect } from "react";
import '../styles/Message.css';

export default function Message({ value, login }){
    return(
        <>
            {value.login == login && <div class="myMsg">{value.msg} <p class="myMsgTime">{value.time}</p></div>}
            {value.login != login && <div class="notMyMsg">{value.msg} <p class="notMyMsgTime">{value.time}</p></div>}
        </>
    )
}