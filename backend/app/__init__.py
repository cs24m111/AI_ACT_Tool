from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
from app.config import Config

db = None

def create_app(config_class=Config):
    """Application factory pattern"""
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Enable CORS for React frontend
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

    # Initialize MongoDB
    global db
    client = MongoClient(app.config['MONGO_URI'])
    db = client.get_database()

    # Initialize config
    config_class.init_app(app)

    # Register blueprints
    from app.blueprints.api import api_bp
    from app.blueprints.auth import auth_bp

    app.register_blueprint(api_bp, url_prefix='/api')
    app.register_blueprint(auth_bp, url_prefix='/auth')

    @app.route('/health')
    def health():
        return {'status': 'healthy'}, 200

    return app
