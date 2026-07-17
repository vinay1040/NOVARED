from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.extensions import db
from app.models.user import User
from app.services.auth_service import login_user, register_user

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")

@auth_bp.post("/register")
def register():
    response, status_code = register_user(request.get_json())
    return jsonify(response), status_code
    
@auth_bp.post("/login")
def login():
    response, status_code = login_user(request.get_json())
    return jsonify(response), status_code
    
@auth_bp.get("/profile")
@jwt_required()
def profile():

    user_id = get_jwt_identity()

    user = db.session.get(User, user_id)

    if not user:
        return jsonify({
            "message": "User not found"
        }), 404

    return jsonify({
        "id": user.id,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        "phone": user.phone,
        "role": user.role,
        "gender": user.gender,
        "city": user.city
    }), 200