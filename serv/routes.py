from flask import Blueprint, request, abort
from db_queries import *
from cfg import *

simple_page = Blueprint('simple_page', __name__)


@simple_page.route('/login', methods=["POST"])
def login_query():
    if not user_exists(request.json):
        abort(401)
    else:
        res = get_token(request.json)
        if len(res) == 2 * TOKEN_HALF_LENGTH:
            return {"status": 200, "token": res, "actualMessages": get_actual_messages({**request.json, "token": res})}
        else:
            abort(401)


@simple_page.route('/register', methods=["POST"])
def register_query():
    if user_exists(request.json):
        abort(401)
    else:
        res = create_user(request.json)
        if len(res) == 2 * TOKEN_HALF_LENGTH:
            return {"status": 200, "token": res, "msg": get_actual_messages({**request.json, "token": res})}
        else:
            abort(401)


@simple_page.route('/delete_user', methods=["POST"])
def delete_user_query():
    delete_user({"token": request.json["token"]})


@simple_page.route('/create_chat', methods=["POST"])
def create_chat_query():
    create_chat(
        {"chatName": request.json["chatName"], "chatType": request.json["chatType"], "token": request.json["token"]})


@simple_page.route('/delete_chat', methods=["POST"])
def delete_chat_query():
    delete_chat({"chat_id": request.json["chat_id"]})


@simple_page.route('/add_user_to', methods=["POST"])
def add_user_to_query():
    add_user_to({"token": request.json["token"], "chat_id": request.json["chat_id"]})


@simple_page.route('/get_chats', methods=["POST"])
def get_chats_query():
    return {"chats": get_chats({"token": request.json["token"]})}


@simple_page.route('/get_messages', methods=["POST"])
def get_chat_messages_query():
    return {"msg": get_chat_messages({"chat_id": request.json["chat_id"]})}
