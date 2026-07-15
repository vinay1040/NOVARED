from app.extensions import db

class Patient(db.Model):
    __tablename__ = "patients"

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    phone = db.Column(db.String(20), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    dob = db.Column(db.Date, nullable=False)

    blood_group_needed = db.Column(db.String(5), nullable=False)
    hospital_name = db.Column(db.String(150), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    condition_description = db.Column(db.Text, nullable=False)
    urgency_level = db.Column(db.Enum("Critical", "High", "Moderate", name="urgency_level"), default="Moderate")

    relation_to_patient = db.Column(db.String(50), nullable=False)  # self / family / friend
    doctor_note_path = db.Column(db.String(255), nullable=True)     # uploaded file path
    additional_notes = db.Column(db.Text, nullable=True)

    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def __repr__(self):
        return f"<Patient {self.id}>"