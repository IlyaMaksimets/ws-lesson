from serv.models import User, Message, Token, db


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


def get_messages(data):
    user_id = get_user_id_by_token(data)
    got_data = list(db.session.execute(db.select(Message)).scalars())
    messages = []
    for msg in got_data:
        messages.append(
            {"id": msg.id, "user_id": msg.user_id, "msg": msg.msg,
             "time": msg.time, "isMine": msg.user_id == user_id})
    return messages


def get_user_chats(data):
    pass
