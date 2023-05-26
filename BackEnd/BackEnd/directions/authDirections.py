from flask import Blueprint, jsonify, request

import BackEnd.functions.authFunctions as callMethod
import BackEnd.generalInfo.Helpers as HelperFunctions
import BackEnd.generalInfo.ResponseMessages as ResponseMessages

authBluePrint = Blueprint('authBluePrint', __name__, url_prefix='/api/auth')

@authBluePrint.post("/login")
def login():
    try:
        username = None
        password = None

        if 'username' in request.json:
            username = request.json['username']
        if 'password' in request.json:
            password = request.json['password']
        if username is None or username == '' or password is None or password == '':
            return {"intResponse": 203, "strAnswer": "Información incompleta"}
        jsonUser = callMethod.login(username, password)
        return jsonify(jsonUser)
    except Exception as exception:
        HelperFunctions.PrintException()
        return ResponseMessages.err500
    
@authBluePrint.post('/loginToken')
def loginToken():
    try:
        if 'strToken' in request.json:
            strToken = request.json['strToken']
        if strToken is None or strToken == '':
            return {'intResponse': 203, 'strAnswer': 'Información incompleta', 'Result': None}

        response = callMethod.loginToken(strToken)
        return jsonify(response)
    except Exception as exception:
        HelperFunctions.PrintException()
        return ResponseMessages.err500
    
@authBluePrint.get('/prueba')
def prueba():
    try:
  
        response = {'respuesta': True}
        return jsonify(response)
    except Exception as exception:
        HelperFunctions.PrintException()
        return ResponseMessages.err500