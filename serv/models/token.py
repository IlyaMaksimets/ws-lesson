from sqlalchemy.orm import Mapped, mapped_column
from .base import db


class Token(db.Model):
    id: Mapped[str] = mapped_column(primary_key=True)
    user_id: Mapped[str]
    date: Mapped[str]
