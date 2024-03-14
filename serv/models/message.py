from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from .base import db


class Message(db.Model):
    id: Mapped[str] = mapped_column(primary_key=True)
    user_id: Mapped[str] = mapped_column(ForeignKey("user.id"))
    msg: Mapped[str]
    time: Mapped[str]
    chat_id: Mapped[str] = mapped_column(ForeignKey("chat.id"))
