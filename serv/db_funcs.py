import secrets

from models import User, Message, db


def set_user(data):
    users = list(db.session.execute(db.select(User).where(User.username == data["login"])).scalars())
    if len(data) > 2:
        if len(users):
            return "user-exists"
        else:
            if data["password"] != data["passwordConfirmation"]:
                return "different-passwords"
            else:
                db.session.execute(
                    db.insert(User).values(id=secrets.token_hex(10), username=data["login"], password=data["password"]))
                db.session.commit()
                return "done"
    else:
        if not len(users):
            return "user-not-exists"
        else:
            if users[0].password != data["password"]:
                return "incorrect-password"
            else:
                return "done"


def save_message(data):
    db.session.execute(db.insert(Message).values(user=data["login"], msg=data["msg"], time=data["time"]))
    db.session.commit()
