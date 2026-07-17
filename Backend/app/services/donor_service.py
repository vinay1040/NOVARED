from app.extensions import db
from flask import jsonify
from app.models.donor import Donor
from app.models.user import User
from datetime import datetime
from app.utils.helpers import get_missing_fields
def register_donor(user_id, data):
    if not data:
        return {
            "message": "No JSON data received"
        },400
    user = db.session.get(User, user_id)
    if not user:
        return jsonify({
            "message": "user not found"
        }),404
    if user.role != "donor":
        return {
            "message": "Only users with donor role can create a donor profile."
        },403
    existing_donor = Donor.query.filter_by(user_id=user.id).first()
    if existing_donor:
        return {
            "message": "Donor profile already exists."
        }, 409
    required_fields = [
    "blood_group",
    "weight"
]
    missing_fields = get_missing_fields(data, required_fields)
    if missing_fields:
        return jsonify({
            "message": "Missing required fields",
            "missing_fields": missing_fields,
        }),400
        last_donation_date = None

    if data.get("last_donation_date"):
        try:
            last_donation_date = datetime.strptime(
                data["last_donation_date"],
                "%Y-%m-%d"
            ).date()
        except ValueError:
            return {
                "message": "Invalid date format. Use YYYY-MM-DD"
            }, 400
        new_donor = Donor(
        user_id=user.id,
        blood_group=data["blood_group"],
        weight=data["weight"],
        last_donation_date=last_donation_date,
        has_chronic_condition=data.get("has_chronic_condition", False),
        on_medication=data.get("on_medication", False),
        available=data.get("available", True),
    )
    try:
        db.session.add(new_donor)
        db.session.commit()

    except Exception as exc:
        db.session.rollback()

        return {
            "message": "Failed to create donor profile",
            "error": str(exc),
        }, 500
    return {
        "message": "Donor profile created successfully.",
        "donor": {
            "id": new_donor.id,
            "user_id": new_donor.user_id,
            "blood_group": new_donor.blood_group,
            "weight": new_donor.weight,
            "available": new_donor.available,
        },
    },201
        