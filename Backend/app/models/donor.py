from app.extensions import db

class Donor(db.Model):
    __tablename__ = "donors"

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    phone = db.Column(db.String(20), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    dob = db.Column(db.Date, nullable=False)

    blood_group = db.Column(db.String(5), nullable=True)
    weight = db.Column(db.Float, nullable=True)
    last_donation_date = db.Column(db.Date, nullable=True)
    has_chronic_condition = db.Column(db.Boolean, default=False)
    on_medication = db.Column(db.Boolean, default=False)

    city = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(255), nullable=True)

    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def __repr__(self):
        return f"<Donor {self.id}>"