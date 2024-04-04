import datetime
import os

from flask import Flask, send_from_directory
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from models import db
from db_funcs import save_message
from routes import simple_page

app = Flask(__name__, static_folder="build", static_url_path='')
socket = SocketIO(app, debug=True, cors_allowed_origins='*')
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
db.init_app(app)
app.register_blueprint(simple_page)
CORS(app)


@socket.on("msg")
def msg(data):
    time = datetime.datetime.now().strftime("%H:%M")
    save_message({**data, "time": time})
    emit("new-msg", {**data, "time": time}, broadcast=True)


@app.route('/login')
@app.route('/home')
@app.route('/register')
@app.route('/')
def serve():

    return send_from_directory('./build', 'index.html')


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run()
