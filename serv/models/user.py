from sqlalchemy.orm import Mapped, mapped_column
from .base import db


class User(db.Model):
    id: Mapped[str] = mapped_column(primary_key=True)
    login: Mapped[str] = mapped_column(unique=True)
    password: Mapped[str]
