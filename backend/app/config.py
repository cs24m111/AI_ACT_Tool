import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-prod')
    MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/compliance_checker')

    # Evidence storage
    EVIDENCE_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'evidence')

    # Scraper settings
    USER_AGENT = 'MeitY-Compliance-Checker/1.0'
    SCRAPER_TIMEOUT = 10

    # Compliance thresholds
    PASSING_SCORE = 70
    MIN_LABEL_SIZE = 12  # minimum font size for compliance labels

    @staticmethod
    def init_app(app):
        os.makedirs(Config.EVIDENCE_DIR, exist_ok=True)
