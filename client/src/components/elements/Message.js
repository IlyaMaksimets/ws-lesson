import { useState, useEffect } from "react";
import '../styles/Message.css';

export default function Message({ value }){
    return(
        <>
            {value.isMine && <div class="myMsg">{value.msg} <p class="myMsgTime">{value.time}</p></div>}
            {!value.isMine && <div class="notMyMsg">{value.msg} <p class="notMyMsgTime">{value.time}</p></div>}
        </>
    )
}