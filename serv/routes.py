from flask import Blueprint, request, abort
from db_funcs import get_token, create_user, get_messages
from cfg import TOKEN_HALF_LENGTH

simple_page = Blueprint('simple_page', __name__)


@simple_page.route('/login')
def login():
    res = get_token(request.json)
    if res == 2 * TOKEN_HALF_LENGTH:
        return {"token": res, "msg": get_messages(request.json["login"])}
    else:
        abort(401)


@simple_page.route('/register')
def register():
    res = create_user(request.json)
    if res == 2 * TOKEN_HALF_LENGTH:
        return {"token": res, "msg": []}
    else:
        abort(401)
