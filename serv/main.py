import secrets
import datetime

from flask import Flask
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socket = SocketIO(app, debug=True, cors_allowed_origins='*')


@socket.on("msg")
def msg(message):
    time = datetime.datetime.now().strftime("%H:%M")
    emit("new-msg", {**message, "time": time}, broadcast=True)


@socket.on("get-token")
def get_token():
    emit("get-token", secrets.token_hex(10))


if __name__ == '__main__':
    app.run()
