import secrets
from cfg import TOKEN_HALF_LENGTH
from models import User, Message, Token, db


def get_user_id(data):
    return list(db.session.execute(db.select(Token).where(Token.id == data["token"])).scalars())[0]["user_id"]


def get_token(data):
    user_id = get_user_id(data)
    return list(db.session.execute(db.select(Token).where(Token.user_id == user_id)).scalars())[0]["id"]


def create_user(data):
    db.session.execute(
        db.insert(User).values(id=secrets.token_hex(TOKEN_HALF_LENGTH), login=data["login"], password=data["password"]))
    db.session.commit()
    return get_token(data)


def save_message(data):
    user_id = get_user_id(data)
    db.session.execute(
        db.insert(Message).values(id=secrets.token_hex(TOKEN_HALF_LENGTH), user_id=user_id, msg=data["msg"],
                                  time=data["time"]))
    db.session.commit()


def get_messages(data):
    user_id = get_user_id(data)
    got_data = list(db.session.execute(db.select(Message).where(Message.user_id == user_id)).scalars())
    messages = []
    for message in got_data:
        messages.append(
            {"id": secrets.token_hex(TOKEN_HALF_LENGTH), "login": message.user_id, "msg": message.msg,
             "time": message.time})
    return messages
