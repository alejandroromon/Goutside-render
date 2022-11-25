from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Rol, Competition, About_us, Competition_user, Stages
from api.utils import generate_sitemap, APIException
from datetime import timedelta
from flask_jwt_extended import (
    JWTManager, jwt_required, get_jwt_identity,
    create_access_token, get_jwt)
import json
import cloudinary
import cloudinary.uploader
from flask_cors import cross_origin, CORS
from sqlalchemy import or_


app = Flask(__name__)
cors = CORS(app)
api = Blueprint('api', __name__)


# ------------  USER ROUTES --------------------------

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data["email"], password=data["password"]).first(
    )
    if user is None:
        return jsonify({"error": "Usuario incorrecto"}), 401
    accesss_token = create_access_token(
        identity=user.id, expires_delta=timedelta(days=20))
    response_body = {
        "message": "Usuario registrado correctamente, acceso permitido",
        "token": accesss_token,
        "user_id": user.id,
        "rol": str(user.rol)
    }
    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    if data.get("password1") != data.get("password2"):
        return jsonify({"message": "Las contraseñas no coinciden"}), 403

    if User.query.filter_by(email=data.get("email")).first() == None:
        new_user = User(
            email=data.get("email"),
            password=data.get("password1")
        )
        db.session.add(new_user)
        db.session.commit()

        access_token = create_access_token(
            identity=new_user.id, expires_delta=timedelta(days=20))
        return jsonify({"logged": True, "token": access_token, "message": "Usuario creado correctamente", "rol": str(new_user.rol), "competitor": new_user.serialize()}), 200
    else:
        return jsonify({"message": "Error, el email ya existe como usuario"}), 400


@api.route('/home/user', methods=['GET'])
@jwt_required()
def private():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user:
        return jsonify({"resultado": "acceso permitido"}), 200
    else:
        return jsonify({"resultado": "usuario no autenticado"}), 400


@api.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=user_id).first()
    return jsonify(user.serialize()), 200


@api.route('/user', methods=['PUT'])
@jwt_required()
def post_user():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    user = User.query.get(current_user_id)
    if data["name"]:
        user.name = data["name"]
    if data["last_name"]:
        user.last_name = data["last_name"]
    if data["adress"]:
        user.adress = data["adress"]
    if data["gender"]:
        user.gender = data["gender"]
    if data["phone"]:
        user.phone = data["phone"]

    db.session.query(User).filter(
        User.id == current_user_id).update({"name": user.name})
    db.session.query(User).filter(
        User.id == current_user_id).update({"last_name": user.last_name})
    db.session.query(User).filter(
        User.id == current_user_id).update({"adress": user.adress})

    db.session.query(User).filter(
        User.id == current_user_id).update({"phone": user.phone})
    db.session.query(User).filter(
        User.id == current_user_id).update({"gender": user.gender})
    db.session.commit()
    response_body = {
        "result": "Datos modificados correctamente",
        "name": user.name,
        "last_name": user.last_name,
        "adress": user.adress,
        "gender": str(user.gender),
        "phone": user.phone,

    }

    return jsonify(response_body), 200


@api.route("/user", methods=['DELETE'])
@jwt_required()
def delete_user():
    current_user_id = get_jwt_identity()
    delete_user = User.query.filter_by(id=current_user_id).first()

    db.session.delete(delete_user)
    db.session.commit()

    response_body = {
        "message": "Usuario eliminado correctamente"
    }
    return jsonify(response_body), 200


@api.route("/token/refresh", methods=['GET'])
@jwt_required(refresh=True)
def refresh_users_token():
    identity = get_jwt_identity()
    access_token = create_access_token(identity=user.id)

    response_body = {'token': access}

    return jsonify(response_body), 200


@api.route('/all-user', methods=['GET'])
@jwt_required()
def get_all_user():
    all_user = User.query.order_by(User.id.asc()).all()
    all_user_serializer = list(
        map(lambda param: param.serialize(), all_user))
    response_body = {
        "result": "usuarios obtenidos correctamente",
        "user": all_user_serializer
    }
    return jsonify(response_body), 200


@api.route('/user/<name>', methods=['GET'])
def get_one_user(name):
    user_search = User.query.filter_by(name=name)
    if user_search is None:
        return jsonify("no se encontraron resultados"), 404
    user_search_serializer = list(
        map(lambda param: param.serialize(), user_search))
    response_body = {
        "users": user_search_serializer,
        "number": len(user_search_serializer)
    }
    return jsonify(response_body), 200


# ------------  COMPETITIONS --------------------------


@api.route('/competitions', methods=['GET'])
@jwt_required()
def get_all_competitions():
    all_competitions = Competition.query.order_by(Competition.id.asc()).all()
    competition_serializer = list(
        map(lambda param: param.serialize(), all_competitions))
    response_body = {
        "result": "Obtenidas competiciones correctamente",
        "competitions": competition_serializer
    }
    return jsonify(response_body), 200


@api.route('/competition/<int:id>', methods=['GET'])
@jwt_required()
def get_one_competition(id):
    competition = Competition.query.get(id)
    competition_serializer = competition.serialize()
    response_body = {
        "result": "Competición obtenida",
        "competition": competition_serializer
    }
    return jsonify(response_body), 200


@api.route('/create-competition', methods=['POST'])
@jwt_required()
def create_competition():
    data = request.get_json()
    userid = get_jwt_identity()
    user = User.query.get(userid)

    if str(user.rol) != "Rol.administration":
        response_body = {
            "result": "No puedes crear una competición. Ponte en contacto con GOutside"
        }
        return jsonify(response_body), 401

    category = list(data["category"])
    competition = Competition(
        adminid=userid,
        competition_name=data["competition_name"],
        qualifier_date=data["qualifier_date"],
        location=data["location"],
        category=category,
        requirements=data["requirements"],
        description=data["description"],
        stage=data["stage"],
        poster_image_url=data["poster_image_url"]
    )

    db.session.add(competition)
    db.session.commit()

    response_body = {
        "result": "Competición añadida correctamente"
    }
    return jsonify(response_body), 200


@api.route('/edit-competition/<int:competition_id>', methods=['PUT'])
@jwt_required()
def modify_competition(competition_id):
    data = request.get_json()
    userid = get_jwt_identity()
    user = User.query.get(userid)

    if str(user.rol) != "Rol.administration":
        response_body = {
            "result": "No puedes crear una competición"
        }
        return jsonify(response_body), 401

    competition = Competition.query.get(competition_id)
    if data is not None and competition:
        competition.competition_name = data["competition_name"]
        competition.qualifier_date = data["qualifier_date"]
        competition.location = data["location"]
        competition.category = data["category"]
        competition.requirements = data["requirements"]
        competition.description = data["description"]
        competition.stage = data["stage"]
        competition.poster_image_url = data["poster_image_url"]
        db.session.commit()

        response_body = {
            "result": "Competición modificada correctamente"
        }

        return jsonify(response_body), 200

    return jsonify({"result": "competición no modificada"}), 400


@api.route('/my-competitions', methods=['GET'])
@jwt_required()
def my_competition():
    competitor_id = get_jwt_identity()
    user = User.query.get(competitor_id)
    if user.rol != Rol.administration:
        my_competition_ids = Competition_user.query.filter(
            Competition_user.competitor_id == competitor_id).all()

        competition_ids = list(
            map(lambda param: param.competition_id, my_competition_ids))

        competitions = Competition.query.filter(
            Competition.id.in_(competition_ids)).all()

        if len(competitions) > 0:
            my_competitions_serializer = list(
                map(lambda param: param.serialize(), competitions))
            return jsonify(my_competitions_serializer), 200
        return jsonify({"message": "Todavía no se ha inscrito en ninguna competición"}), 204

    else:
        my_competitions = Competition.query.filter_by(adminid=competitor_id)
        my_competitions_serializer = list(
            map(lambda param: param.serialize(), my_competitions))
        return jsonify(my_competitions_serializer), 200


@api.route('/my-competitions', methods=['POST'])
@jwt_required()
def add_my_competition():
    competitor_id = get_jwt_identity()
    data = request.get_json()
    user_in = Competition_user.query.filter_by(competitor_id=competitor_id,
                                               competition_id=data["competition_id"]).all()
    if user_in:
        response_body = {
            "result": "Ya estas apuntado en esta competición"
        }
        return jsonify(response_body), 400
    my_competition = Competition_user(
        competitor_id=competitor_id,
        competition_id=data["competition_id"]
    )

    db.session.add(my_competition)
    db.session.commit()

    response_body = {
        "result": "Competición añadida correctamente a mis competiciones"
    }
    return jsonify(response_body), 200

# ------------  COMPETITORS (Tabla USERS) --------------------------


@api.route('/create-competitor/<int:competitor_id>', methods=['PUT'])
@jwt_required()
def modify_competitor(user_id):
    data = request.get_json()
    competitor = User.query.get(user_id)
    if data is not None and competitor:
        competitor.name = data["name"],
        competitor.last_name = data["last_name"],
        competitor.profile_image_url = data["profile_image_url"],
        competitor.adress = data["adress"],
        competitor.gender = data["gender"],
        competitor.phone = data["phone"],
        competitor.rol = data["rol"],

        response_body = {
            "result": "Competidor modificado correctamente"
        }

        return jsonify(response_body), 200

    return jsonify({"result": "Competidor no modificado"}), 400


# ------------  CLOUDINARY --------------------------

@api.route('/upload', methods=['POST'])
@jwt_required()
def handle_upload():
    user_id = get_jwt_identity()
    if 'profile_image' in request.files:
        result = cloudinary.uploader.upload(request.files['profile_image'])
        user_update = User.query.filter_by(id=user_id).first()
        user_update.profile_image_url = result['secure_url']

        db.session.add(user_update)
        db.session.commit()
        return jsonify(user_update.serialize()), 200
    return jsonify({"message": "error"}), 400


@api.route('/poster-upload', methods=['POST'])
@jwt_required()
def handle_poster_upload():
    user_id = get_jwt_identity()

    if 'poster_image' in request.files:
        result = cloudinary.uploader.upload(request.files['poster_image'])

        return jsonify({"url": result['secure_url']}), 200
    return jsonify({"message": "error"}), 400


# ------------  ABOUT_US --------------------------

@api.route('/about-us', methods=['POST'])
def contactForm():
    data = request.get_json()
    aboutUs = About_us(
        name=data["name"],
        email=data["email"],
        phone=data["phone"],
        contact_request=data["contact_request"],

    )
    db.session.add(aboutUs)
    db.session.commit()
    response_body = {
        "result": "Petición de contacto recibida correctamente"
    }
    return jsonify(response_body), 200
