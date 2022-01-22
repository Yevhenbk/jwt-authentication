from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.dialects.postgresql import VARCHAR
from sqlalchemy.orm import relationship

db = SQLAlchemy()

class Account(db.Model):
    __tablename__="account"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(280), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return '<Account %r>' % self.email

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "password": self.password
            # do not serialize the password, its a security breach
        }

    @classmethod
    def get_by_email(cls, email):
        account = cls.query.filter_by(email=email).one_or_none()
        return account

    def create(self):
        db.session.add(self)
        db.session.commit()