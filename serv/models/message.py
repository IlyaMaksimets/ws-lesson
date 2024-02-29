from sqlalchemy.orm import Mapped, mapped_column
from .base import db


class Message(db.Model):
    user: Mapped[str] = mapped_column(primary_key=True)
    msg: Mapped[str]
    time: Mapped[str]
