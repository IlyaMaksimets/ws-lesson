import datetime
import secrets

from serv.cfg import TOKEN_HALF_LENGTH
from serv.models import User, Message, Token, db
from .get_queries import get_token, get_user_id_by_token, get_user_id_by_login


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
    pass


def create_chat(data):
    pass


def delete_chat(data):
    pass


def add_user_to(data):
    pass
