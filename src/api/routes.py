"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from sqlalchemy import exc
from api.models import db, Account
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

from werkzeug.security import check_password_hash, generate_password_hash

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/login', methods=['POST'])
def login():
    email = request.json.get(
        'email', None
    )
    password = request.json.get(
        'password', None
    )
    if not (email and password):
        return ({'error': 'Wrong email or password'}), 400

    account = Account.get_by_email(email)
    print(account)
    if not account: return ({'error': 'usuario no encontrado'}), 400

 
    if account.is_active and check_password_hash(account.password, password):
        token = create_access_token(identity=account.id, expires_delta=timedelta(minutes=120))
        return {'token': token, "email":account.email}, 200

    return ({'error': 'Wrong email or password'}), 400


@api.route('/signup', methods=['POST'])
def create_account(): 
    email = request.json.get(
        'email', None
    )
    password = request.json.get(
        'password', None
    ) 
    
    print(email, password, "###################################")
    if not (password and email):
        return ({'error': 'Some fields are missing'}), 400
    
    
    account = Account(
        email=email, 
        password=generate_password_hash(password, method='pbkdf2:sha256', salt_length=16),
        is_active=True
    )
    print(account, "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    
    
    try:
        account.create()
        return jsonify(account.to_dict()), 201
        
    except exc.IntegrityError:
        return ({'error': 'This email / phone number is already in use'}), 400
