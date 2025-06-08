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


CORS(api)


CLIENT_ID = "2r3wcled8ugszufen3r4r2makgitqq"
ACCESS_TOKEN = "x3du3wpyr1fvn0jmmrtyzsq6sek9w0"


@api.route('/retrogames', methods=['GET', 'POST'])
def get_vintage_games():
    if request.method == 'POST':
        payload = request.get_json() or {}
    else:
        payload = request.args or {}

    try:
        limit = int(payload.get('limit', 20))
        offset = int(payload.get('offset', 0))
    except ValueError:
        return jsonify({"error": "limit and offset must be integers"}), 400

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

    games = response.json()

    # Manually attach YouTube trailers
    youtube_links = {
        "Super Mario Bros.": "https://www.youtube.com/embed/KM8Y4wqXFz4",
        "Sonic the Hedgehog": "https://www.youtube.com/embed/CwYNFlsLTs0",
        "The Legend of Zelda": "https://www.youtube.com/embed/cI2uKsbFj94",
        "Pac-Man": "https://www.youtube.com/embed/teQwViKMnxk",
        "Donkey Kong": "https://www.youtube.com/embed/1P-xP8FJj28"
    }

    for game in games:
        name = game.get("name")
        if name in youtube_links:
            game["gameplay_url"] = youtube_links[name]
        else:
            game["gameplay_url"] = None

    return jsonify(games), 200




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
def get_user_by_id():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()

    if not user:
        return jsonify({"error": "User not found"}), 404
        
    access_token = create_access_token(identity=user.email)
    return jsonify(user=user.serialize(), access_token=access_token), 200


@api.route('/profile', methods=['PUT'])
@jwt_required()
def update_about():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()

    if 'about' in data:
        user.about = data['about']

    db.session.commit()

    return jsonify({"message": "Profile updated", "user": user.serialize()}), 200

@api.route('/saved-games', methods=['GET'])
@jwt_required()
def get_saved_games():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify(user.saved_games), 200


@api.route('/saved-games', methods=['PUT'])
@jwt_required()
def save_game():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()

    if not data:
        return jsonify({"error": "No game data provided"}), 400

    # Prevent duplicate entries by checking name or id
    if any(game['name'] == data['name'] for game in user.saved_games):
        return jsonify({"message": "Game already saved"}), 200

    user.saved_games.append(data)
    db.session.commit()

    return jsonify({"message": "Game saved", "saved_games": user.saved_games}), 200

@app.route('/delete-saved-game', methods=['DELETE'])
@jwt_required()
def delete_saved_game():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    game_id = data.get("game_id")

    # Remove game with matching ID
    user.saved_games = [g for g in user.saved_games if g.get("id") != game_id]

    db.session.commit()
    return jsonify({"message": "Game deleted successfully"}), 200