from flask import Blueprint, request, abort
from db_funcs import *
from cfg import *

simple_page = Blueprint('simple_page', __name__)


@simple_page.route('/login', methods=["POST"])
def login():
    if not user_exists(request.json):
        abort(401)
    else:
        res = get_token(request.json)
        if len(res) == 2 * TOKEN_HALF_LENGTH:
            return {"status": 200, "token": res, "msg": get_messages({**request.json, "token": res})}
        else:
            abort(401)


@simple_page.route('/register', methods=["POST"])
def register():
    if user_exists(request.json):
        abort(401)
    else:
        res = create_user(request.json)
        if len(res) == 2 * TOKEN_HALF_LENGTH:
            return {"status": 200, "token": res, "msg": get_messages({**request.json, "token": res})}
        else:
            abort(401)
