import datetime
import secrets

from serv.cfg import TOKEN_HALF_LENGTH
from .get_queries import *


def create_user(data):
    db.session.execute(
        db.insert(User).values(id=secrets.token_hex(TOKEN_HALF_LENGTH), login=data["login"], password=data["password"]))
    db.session.commit()
    db.session.execute(
        db.insert(Token).values(id=secrets.token_hex(TOKEN_HALF_LENGTH), user_id=get_user_id_by_login(data),
                                date=datetime.datetime.now().strftime("%Y/%m/%d")))
    db.session.commit()
    return get_token(data)


def save_message(data):
    user_id = get_user_id_by_token(data)
    db.session.execute(
        db.insert(Message).values(id=secrets.token_hex(TOKEN_HALF_LENGTH), user_id=user_id, msg=data["msg"],
                                  time=data["time"]))
    db.session.commit()


def delete_user(data):
    user_id = get_user_id_by_token(data)
    db.session.execute(db.delete(UserChat).where(UserChat.user_id == user_id))
    db.session.execute(db.delete(User).where(User.id == user_id))
    db.session.commit()


def create_chat(data):
    user_id = get_user_id_by_token(data)
    chat_id = secrets.token_hex(TOKEN_HALF_LENGTH)
    db.session.execute(db.insert(Chat).values(id=chat_id, name=data["chatName"], type=data["chatType"], owner_id=user_id))
    db.session.execute(db.insert(UserChat).values(user_id=user_id, chat_id=chat_id))
    db.session.commit()


def delete_chat(data):
    db.session.execute(db.delete(UserChat).where(UserChat.chat_id == data["chat_id"]))
    db.session.execute(db.delete(Chat).where(Chat.id == data["chat_id"]))
    db.session.commit()


def add_user_to(data):
    user_id = get_user_id_by_token(data)
    db.session.execute(db.insert(UserChat).values(user_id=user_id, chat_id=data["chat_id"]))
    db.session.commit()
