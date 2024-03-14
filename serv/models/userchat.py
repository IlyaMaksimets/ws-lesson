from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from .base import db


class UserChat(db.Model):
    user_id: Mapped[str] = mapped_column(ForeignKey("user.id"), primary_key=True)
    chat_id: Mapped[str] = mapped_column(ForeignKey("chat.id"), primary_key=True)
