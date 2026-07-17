from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services.donor_service import register_donor
from app.utils.decorator import role_required

donor_bp = Blueprint(
    "donor",__name__,url_prefix="/donor"
)

@donor_bp.post("/register")
@jwt_required()
@role_required("donor")
def create_donor():
    data = request.get_json()
    user_id = int(get_jwt_identity())
    response, status_code = register_donor(user_id, data)
    return response, status_code