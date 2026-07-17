from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from app.utils.decorator import role_required

admin_bp = Blueprint("admin", __name__, url_prefix="/admin")

@admin_bp.get("/dashboard")
@jwt_required
@role_required("admin")
def admin_dashboard():
    return jsonify({
        "message": "Welcome Admin"
    }),200