import '../styles/Message.css';

export default function Message({ value }){
    return(
        <>
            {value.isMine === true && <div class="myMsg">{value.msg} <p class="myMsgTime">{value.time}</p></div>}
            {value.isMine === false && <div class="notMyMsg">{value.msg} <p class="notMyMsgTime">{value.time}</p></div>}
        </>
    )
}