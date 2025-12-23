from flask import Blueprint, request, jsonify

auth_bp = Blueprint('auth', __name__)

# Stub for future authentication endpoints

@auth_bp.route('/login', methods=['POST'])
def login():
    """Stub for login endpoint"""
    return jsonify({'message': 'Authentication not yet implemented'}), 501

@auth_bp.route('/register', methods=['POST'])
def register():
    """Stub for registration endpoint"""
    return jsonify({'message': 'Authentication not yet implemented'}), 501
