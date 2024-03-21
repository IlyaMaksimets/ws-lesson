export default function reducer(state, action) {
    switch (action.type) {
        case "user_auth": {
            return {
            ...state,
            "token": action.token,
            "actualMessages": action.actualMessages
            }
        }
        case "change_current_chat": {
            return {
            ...state,
            ...action.chat
            }
        }
    }
}