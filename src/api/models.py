import json
import enum
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Enum, DateTime
from sqlalchemy.dialects.postgresql import ARRAY
from datetime import datetime

db = SQLAlchemy()


class Rol(enum.Enum):
    competitor = 1
    administration = 2

    def serialize(self):
        return {
            "administration": self.administration,
            "competitor": self.competitor
        }


class Gender(enum.Enum):
    masculino = 1
    femenino = 2


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(40), unique=False, nullable=False)
    name = db.Column(db.String(120), unique=False, nullable=True)
    last_name = db.Column(db.String(120), unique=False, nullable=True)
    profile_image_url = db.Column(db.String(255), unique=False, nullable=True)
    adress = db.Column(db.String(240), unique=False, nullable=True)
    gender = db.Column(Enum(Gender), nullable=True)
    phone = db.Column(db.Integer, unique=False, nullable=True)
    rol = db.Column(Enum(Rol, name="name"),
                    default="competitor", nullable=False)
    competition_competitor = db.relationship(
        'Competition_user', backref='user', lazy=True)
    qualifier_competitor = db.relationship(
        'Qualifier_competitor', backref='user', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "last_name": self.last_name,
            "adress": self.adress,
            "profile_image": self.profile_image_url,
            "gender": str(self.gender),
            "phone": self.phone,
            "rol": str(self.rol)
        }


class Competition_user(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    competitor_id = db.Column(db.Integer, db.ForeignKey(
        'user.id'), nullable=False)
    competition_id = db.Column(db.Integer, db.ForeignKey(
        'competition.id'), nullable=False)


class Category(enum.Enum):
    rx_femenino = 1
    rx_masculino = 2
    scalled_femenino = 3
    scalled_masculino = 4
    elite_femenino = 5
    elite_masculino = 6
    equipos = 7

    def serialize(self):
        return {
            "rx_femenino": self.rx_femenino,
            "rx_masculino": self.rx_masculino,
            "scalled_femenino": self.scalled_femenino,
            "scalled_masculino": self.scalled_masculino,
            "elite_femenino": self.elite_femenino,
            "elite_masculino": self.elite_masculino,
            "equipos": self.equipos
        }


class Stages(enum.Enum):
    inscripción_abierta = 1
    inscripción_cerrada = 2
    competición_finalizada = 3

    def serialize(self):
        return {
            "inscripción_abierta": self.inscripción_abierta,
            "inscripción_cerrada": self.inscripción_cerrada,
            "competición_finalizada": self.competición_finalizada,
        }


class Competition(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    adminid = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    competition_name = db.Column(db.String(12), unique=False, nullable=False)
    qualifier_date = db.Column(db.DateTime())
    location = db.Column(db.String(240), unique=False, nullable=False)
    category = db.Column(ARRAY(Enum(Category)))
    requirements = db.Column(db.String(500), unique=False, nullable=False)
    description = db.Column(db.String(500), unique=False, nullable=False)
    create_at = db.Column(db.DateTime(), default=datetime.utcnow())
    poster_image_url = db.Column(db.String(255), unique=False, nullable=True)
    stage = db.Column(Enum(Stages), nullable=False)
    competition_competitor = db.relationship(
        'Competition_user', backref='competition', lazy=True)

    def serialize(self):
        category = []
        for cat in self.category:
            category.append(cat.name)
        return {
            "id": self.id,
            "adminid": self.adminid,
            "competition_name": self.competition_name,
            "qualifier_date": self.qualifier_date.strftime("%m/%d/%Y, %H:%M:%S"),
            "location": self.location,
            "category": list(map(lambda param: param, category)),
            "requirements": self.requirements,
            "description": self.description,
            "create_at": self.create_at,
            "stage": self.stage.name,
            "poster_image_url": self.poster_image_url
        }


class Qualifier_competitor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    qualifier_id = db.Column(db.Integer, db.ForeignKey(
        'qualifier.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'user.id'), nullable=False)


class Qualifier(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    media = db.Column(db.String(240), unique=False, nullable=True)
    comment = db.Column(db.String(500), unique=False, nullable=True)
    previous_result = db.Column(db.Integer, unique=False, nullable=True)
    qualifier_competitor = db.relationship(
        'Qualifier_competitor', backref='qualifier', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "media": self.media,
            "comment": self.comment,
            "previous_result": self.previous_result
        }


class About_us(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.Integer, unique=False, nullable=False)
    contact_request = db.Column(db.String(3000), unique=False, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "contact_request": self.contact_request,
        }
