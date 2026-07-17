from app.extensions import db


class BloodBank(db.Model):
    __tablename__ = "blood_banks"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False,
        unique=True
    )

    facility_name = db.Column(
        db.String(150),
        nullable=False
    )

    license_id = db.Column(
        db.String(50),
        unique=True,
        nullable=False
    )

    license_document_path = db.Column(
        db.String(255)
    )

    status = db.Column(
        db.Enum(
            "pending",
            "approved",
            "rejected",
            name="bank_status"
        ),
        default="pending"
    )

    def __repr__(self):
        return f"<BloodBank {self.facility_name}>"