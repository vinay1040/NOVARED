from app.extensions import db


class Patient(db.Model):
    __tablename__ = "patients"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False,
        unique=True
    )

    blood_group_needed = db.Column(
        db.String(5),
        nullable=False
    )

    hospital_name = db.Column(
        db.String(150),
        nullable=False
    )

    condition_description = db.Column(
        db.Text,
        nullable=False
    )

    urgency_level = db.Column(
        db.Enum(
            "Critical",
            "High",
            "Moderate",
            name="urgency_level"
        ),
        default="Moderate"
    )

    relation_to_patient = db.Column(
        db.Enum(
            "Self",
            "Family",
            "Friend",
            name="relation_type"
        ),
        nullable=False
    )

    doctor_note_path = db.Column(
        db.String(255)
    )

    additional_notes = db.Column(
        db.Text
    )

    def __repr__(self):
        return f"<Patient {self.user.email}>"