from app.extensions import db

class BloodBank(db.Model):
    __tablename__ = "blood_banks"

    id = db.Column(db.Integer, primary_key=True)
    facility_name = db.Column(db.String(150), nullable=False)
    license_id = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)

    city = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    license_document_path = db.Column(db.String(255), nullable=True)

    status = db.Column(db.Enum("pending", "approved", "rejected", name="bank_status"), default="pending")

    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def __repr__(self):
        return f"<BloodBank {self.id}>"