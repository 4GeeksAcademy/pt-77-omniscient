"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import get_jwt_identity, create_access_token, jwt_required
import hashlib
import requests


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


CLIENT_ID = "2r3wcled8ugszufen3r4r2makgitqq"
ACCESS_TOKEN = "x3du3wpyr1fvn0jmmrtyzsq6sek9w0"


@api.route('/retrogames', methods=['POST'])
def get_vintage_games():
    payload = request.get_json() or {}
    limit = payload.get('limit', 20)     # default limit = 20
    offset = payload.get('offset', 0)    # default offset = 0

    headers = {
        "Client-ID": CLIENT_ID,
        "Authorization": f"Bearer {ACCESS_TOKEN}",
        "Content-Type": "application/json"
    }

    igdb_query = f"""
        fields 
            name,
            summary,
            cover.url,
            genres.name,
            first_release_date,
            platforms.name,
            involved_companies.company.name,
            involved_companies.developer,
            rating,
            screenshots.url;
        sort first_release_date desc;
        limit {limit};
        offset {offset};
    """

    response = requests.post(
        "https://api.igdb.com/v4/games",
        headers=headers,
        data=igdb_query
    )

    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch games from IGDB"}), response.status_code

    return jsonify(response.json()), 200



if __name__ == '__main__':
    api.run(debug=True, port=3001)


@api.route('/signup', methods=['POST'])
def handle_signup():
    body = request.get_json()
    body_email = body['email']
    body_password = hashlib.sha256(
        body['password'].encode("utf-8")).hexdigest()
    user = User(email=body_email, password=body_password, is_active=True)

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
        access_token = create_access_token(identity=user.email)
        return jsonify(user=user.serialize(), access_token=access_token)
    else:
        return jsonify("user not found")


@api.route('/profile', methods=['GET'])
@jwt_required()
def get_user():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()

    return jsonify(user=user.serialize()), 200


@api.route("/user", methods=["GET"])
@jwt_required()
def get_user_by_id(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify(user.serialize()), 200

# @api.route('/games', methods=['GET'])
# def get_rawg_games():

#     search = request.args.get('search', '')
#     page = request.args.get('page', 1)
#     page_size = request.args.get('page_size', 10)

#     params = {
#         'key': "e09cf7c5817241ee825687b3373f921f",
#         'search': search,
#         'page': page,
#         'page_size': page_size
#     }

#     try:
#         response = requests.get('https://api.rawg.io/api/games', params=params, headers={
#             'Accept': 'application/json',
#             'User-Agent': 'MyGameApp/1.0'
#         })

#         if response.status_code != 200:
#             return jsonify({'error': 'Failed to fetch games from RAWG'}), response.status_code

#         return jsonify(response.json()), 200

#     except Exception as e:
#         print("RAWG fetch error:", e)
#         return jsonify({'error': 'Server error'}), 500
