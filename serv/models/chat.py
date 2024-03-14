from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from .base import db


class Chat(db.Model):
    id: Mapped[str] = mapped_column(primary_key=True)
    name: Mapped[str]
    type: Mapped[str]
    owner_id: Mapped[str] = mapped_column(ForeignKey("chat.id"))
