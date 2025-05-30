"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import get_jwt_identity, create_access_token, jwt_required, create_access_token
import hashlib
import requests


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


CLIENT_ID = "2r3wcled8ugszufen3r4r2makgitqq"
ACCESS_TOKEN = "x3du3wpyr1fvn0jmmrtyzsq6sek9w0"


@api.route('/retrogames', methods=['POST'])
def get_vintage_games():
    # payload = request.get_json()

    headers = {
        "Client-ID": CLIENT_ID,
        "Authorization": f"Bearer {ACCESS_TOKEN}",
        "Content-Type": "application/json"
    }
    response = requests.post(
        "https://api.igdb.com/v4/games",
        headers=headers,
        data="fields name,cover.url,genres.name,first_release_date; limit 10;"
    )

    return jsonify(response.json())


if __name__ == '__main__':
    api.run(debug=True, port=3001)


@api.route('/signup', methods=['POST'])
def handle_signup():
    body = request.get_json()
    body_email = body['email']
    body_password = hashlib.sha256(
        body['password'].encode("utf-8")).hexdigest()
    user = User(email=body_email, password=body_password)

    db.session.add(user)
    db.session.commit()

    return jsonify("User created"), 200


@api.route('/login', methods=['POST'])
def handle_login():
    body = request.get_json()
    body_email = body['email']
    body_password = hashlib.sha256(
        body['password'].encode("utf-8")).hexdigest()
    user = User.query.filter_by(email=body_email).first()
    if user and user.password == body_password:
        access_token = create_access_token(identify=user.email)
        return jsonify(access_token=access_token)
    else:
        return jsonify(access_token=access_token)


@api.route('/private', methods=['Get'])
@jwt_required()
def get_user():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()

    return jsonify(user=user.serialize()), 200
