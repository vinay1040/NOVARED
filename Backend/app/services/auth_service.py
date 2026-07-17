from datetime import datetime
from app.utils.helpers import get_missing_fields
from flask_jwt_extended import create_access_token

from app.extensions import db
from app.models.user import User
from app.utils.password import hash_password, verify_password
from app.utils.validators import is_valid_email


def get_missing_fields(data, required_fields):
    missing = []
    for field in required_fields:
        if field not in data or not data[field]:
            missing.append(field)
    return missing


def register_user(data):
    """Perform the registration business logic and return a response tuple."""
    if not data:
        return {"message": "No data recieved"}, 400

    required_fields = [
        "first_name",
        "last_name",
        "email",
        "phone",
        "password",
        "role",
        "gender",
        "dob",
        "city",
    ]

    missing_fields = get_missing_fields(data, required_fields)
    if missing_fields:
        return {
            "message": "Missing required fields",
            "missing_fields": missing_fields,
        }, 400

    if not is_valid_email(data["email"]):
        return {"message": "Invalid email address"}, 400

    existing_user = User.query.filter_by(email=data["email"]).first()
    if existing_user:
        return {"message": "Email already registered"}, 409

    hashed_password = hash_password(data["password"])

    try:
        dob = datetime.strptime(data["dob"], "%Y-%m-%d").date()
    except ValueError:
        return {"message": "Invalid date format: use yyyy-mm-dd"}, 400

    new_user = User(
        first_name=data["first_name"],
        last_name=data["last_name"],
        email=data["email"],
        phone=data["phone"],
        password_hash=hashed_password,
        role=data["role"],
        gender=data["gender"],
        dob=dob,
        city=data["city"],
        address=data.get("address"),
    )

    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as exc:
        db.session.rollback()
        return {
            "message": "Registration failed",
            "error": str(exc),
        }, 500

    return {"message": "registered successfully"}, 201


def login_user(data):
    """Perform the login business logic and return a response tuple."""
    if not data:
        return {"message": "No JSON data received"}, 400

    required_fields = ["email", "password"]
    missing_fields = get_missing_fields(data, required_fields)
    if missing_fields:
        return {
            "message": "Missing required fields",
            "missing_fields": missing_fields,
        }, 400

    user = User.query.filter_by(email=data["email"]).first()
    if not user or not verify_password(user.password_hash, data["password"]):
        return {"message": "Invalid email or password"}, 401

    access_token = create_access_token(identity=str(user.id))

    return {
        "message": "Login successful",
        "access_token": access_token,
        "user": {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "role": user.role,
        },
    }, 200
