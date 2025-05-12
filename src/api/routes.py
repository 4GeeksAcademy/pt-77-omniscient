"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import get_jwt_identity, create_access_token, jwt_required, create_access_token
import hashlib


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/signup', methods=['POST'])
def handle_signup():
    body = request.get_json()
    body_email = body['email']
    body_password = hashlib.sha256(body['password'].encode("utf-8")).hexdigest()
    user = User(email = body_email, password = body_password)

    db.session.add(user)
    db.session.commit()

    return jsonify("User created"), 200



@api.route('/login', methods=['POST'])
def handle_login():
    body = request.get_json()
    body_email = body['email']
    body_password = hashlib.sha256(body['password'].encode("utf-8")).hexdigest()
    user = User.query.filter_by(email = body_email).first()
    if user and user.password == body_password:
        access_token = create_access_token(identify = user.email)
        return jsonify(access_token=access_token)
    else:
        return jsonify(access_token=access_token)



@api.route('/private', methods=['Get'])
@jwt_required()
def get_user():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    
    return jsonify(user=user.serialize()), 200