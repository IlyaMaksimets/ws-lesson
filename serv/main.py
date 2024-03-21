import datetime

from flask import Flask
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from models import db
from db_queries import save_message
from routes import simple_page

app = Flask(__name__)
socket = SocketIO(app, debug=True, cors_allowed_origins='*')
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
db.init_app(app)
app.register_blueprint(simple_page)
CORS(app)


@socket.on("msg")
def msg(data):
    time = datetime.datetime.now().strftime("%H:%M")
    save_message({**data, "time": datetime.datetime.now()})
    emit("new-msg", {**data, "time": time}, broadcast=True)


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run()
