export default function fillState() {
    return {
    token: "",
    actualMessages: "",
    chatId: "",
    socket: io("localhost:5000")
    };
}