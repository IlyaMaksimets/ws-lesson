from serv.models import *
from sqlalchemy import desc


def user_exists(data):
    return len(list(db.session.execute(
        db.select(User).where(User.login == data["login"], User.password == data["password"])).scalars())) > 0


def get_user_id_by_login(data):
    return list(db.session.execute(db.select(User).where(User.login == data["login"])).scalars())[0].id


def get_user_id_by_token(data):
    return list(db.session.execute(db.select(Token).where(Token.id == data["token"])).scalars())[0].user_id


def get_token(data):
    user_id = get_user_id_by_login(data)
    return list(db.session.execute(db.select(Token).where(Token.user_id == user_id)).scalars())[0].id


def get_actual_messages(data):
    user_id = get_user_id_by_token(data)
    chats_id = get_chats_id(data["user_id"])
    chats_id_keys = []
    for chat_id in chats_id:
        chats_id_keys.append(chat_id.chat_id)
    got_data = list(db.session.execute(db.select(Message)).where(Message.chat_id in chats_id_keys).order_by(desc(Message.)).scalars())
    messages = []
    for msg in got_data:
        messages.append(
            {"id": msg.id, "user_id": msg.user_id, "msg": msg.msg,
             "time": msg.time, "isMine": msg.user_id == user_id})
    return messages


def get_chats_id(data):
    return list(db.session.execute(db.select(UserChat).where(UserChat.user_id == data["user_id"])))


def get_chats(data):
    chats_id = get_chats_id(data)
    return list(db.session.execute(db.select(Chat).where(Chat.id in chats_id)))


def get_chat_messages(data):
    messages = list(db.session.execute(db.select(Message).where(Message.chat_id == data["chat_id"])))
    for msg in messages:
        msg.time = msg.time.strftime("%H:%M")
    return messages
