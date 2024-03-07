import '../styles/Message.css';

export default function Message({ value, token }){
    return(
        <>
            {value.token == token && <div class="myMsg">{value.msg} <p class="myMsgTime">{value.time}</p></div>}
            {value.token != token && <div class="notMyMsg">{value.msg} <p class="notMyMsgTime">{value.time}</p></div>}
        </>
    )
}