from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required

import BackEnd.functions.servicesFunctions as callMethod
import BackEnd.generalInfo.Helpers as HelperFunctions
import BackEnd.generalInfo.ResponseMessages as ResponseMessages

servicesBluePrint = Blueprint('servicesBluePrint', __name__, url_prefix='/api/services')

@servicesBluePrint.get('/get')
@jwt_required()
def get():
    try:
        response = callMethod.get()
        return jsonify(response)
    except Exception as exception:
        HelperFunctions.PrintException()
        return ResponseMessages.err500
    
@servicesBluePrint.get('/getRoomsDetails/<id>')
@jwt_required()
def getRoomsDetails(id):
    try:
        response = callMethod.getRoomsDetails(id)
        return jsonify(response)
    except Exception as exception:
        HelperFunctions.PrintException()
        return ResponseMessages.err500
    
@servicesBluePrint.get('/getReservations/<id>')
@jwt_required()
def getReservations(id):
    try:
        response = callMethod.getReservations(id)
        return jsonify(response)
    except Exception as exception:
        HelperFunctions.PrintException()
        return ResponseMessages.err500
    
@servicesBluePrint.get('/getRooms')
@jwt_required()
def getRooms():
    try:
        response = callMethod.getRooms()
        return jsonify(response)
    except Exception as exception:
        HelperFunctions.PrintException()
        return ResponseMessages.err500
    
@servicesBluePrint.get('/getSelectRooms')
@jwt_required()
def getSelectRooms():
    try:
        response = callMethod.getSelectRooms()
        return jsonify(response)
    except Exception as exception:
        HelperFunctions.PrintException()
        return ResponseMessages.err500
    
@servicesBluePrint.post('/registerUser')
#@jwt_required()
def registerUser():
    try:
        username = None
        mail = None
        password = None

        if 'username' in request.json:
            username = request.json['username']
        if 'mail' in request.json:
            mail = request.json['mail']
        if 'password' in request.json:
            password = request.json['password']
        if username is None or username == '' or \
                mail is None or mail == '' or \
                password is None or password == '':
            return {'intResponse': 203, 'strAnswer': 'Información incompleta', 'Result': None}
        
        response = callMethod.registerUser(username, mail, password)
        return jsonify(response)
    except Exception as exception:
        HelperFunctions.PrintException()
        return ResponseMessages.err500
    
@servicesBluePrint.post('/registerRooms')
@jwt_required()
def registerRooms():
    try:
        nombre = None
        capacidad = None
        horarios = None
        if 'nombre' in request.json:
            nombre = request.json['nombre']
        if 'capacidad' in request.json:
            capacidad = request.json['capacidad']
        if 'horarios' in request.json:
            horarios = request.json['horarios']
        if nombre is None or nombre == '' or \
                capacidad is None or capacidad == '' or \
                horarios is None or horarios == '':
            return {'intResponse': 203, 'strAnswer': 'Información incompleta', 'Result': None}
        
        response = callMethod.registerRooms(nombre, capacidad,horarios)
        return jsonify(response)
    except Exception as exception:
        HelperFunctions.PrintException()
        return ResponseMessages.err500
    
@servicesBluePrint.post('/registerReservations')
@jwt_required()
def registerReservations():
    try:
        sala = None
        idusuario = None
        shedules = None
        descripcion = None

        if 'sala' in request.json:
            sala = int(request.json['sala'])
        if 'idusuario' in request.json:
            idusuario = int(request.json['idusuario'])
        if 'shedules' in request.json:
            shedules = request.json['shedules']
        if 'descripcion' in request.json:
            descripcion = request.json['descripcion']
        if sala is None or sala == '' or \
                idusuario is None or idusuario == '' or \
                descripcion is None or descripcion == '' or \
                shedules is None or shedules == '':
            return {'intResponse': 203, 'strAnswer': 'Información incompleta', 'Result': None}
        
        response = callMethod.registerReservations(sala,idusuario,shedules,descripcion)
        return jsonify(response)
    except Exception as exception:
        HelperFunctions.PrintException()
        return ResponseMessages.err500