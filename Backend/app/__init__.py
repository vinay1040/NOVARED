from flask import Flask
from app.config import Config
from app.extensions import db, jwt
from app.routes.auth import auth_bp
from flask_cors import CORS
from app.routes.admin import admin_bp
from app.routes.donor import donor_bp

def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)
    
    CORS(app,resources={
        r"/*":{
            "origins":["http://localhost:5173","http://127.0.0.1.5173"
        ]}
    })
    db.init_app(app)
    jwt.init_app(app)

    app.register_blueprint(auth_bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(donor_bp)
    
    
    with app.app_context():
        db.create_all()

    return app