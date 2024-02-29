import secrets
import datetime

from flask import Flask
from flask_socketio import SocketIO, emit
from models import db
from db_funcs import set_user, save_message

app = Flask(__name__)
socket = SocketIO(app, debug=True, cors_allowed_origins='*')
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
db.init_app(app)


@socket.on("msg")
def msg(data):
    time = datetime.datetime.now().strftime("%H:%M")
    save_message({**data, "time": time})
    emit("new-msg", {**data, "time": time}, broadcast=True)


@socket.on("auth-user")
def get_token(data):
    res = set_user(data)
    if res == "done":
        emit("auth-user-success", {"login": data["login"]})
    else:
        emit("error", res)


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run()
