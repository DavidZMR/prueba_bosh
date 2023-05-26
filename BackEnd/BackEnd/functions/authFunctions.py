import hashlib
import json
from flask_jwt_extended import create_access_token, decode_token

from  BackEnd.generalInfo.Keys import getConnectionSqlServer
import BackEnd.generalInfo.Helpers as HelperFunctions
import BackEnd.generalInfo.ResponseMessages as ResponseMessages

def login(strUserName, strPassword):
    try:
        SqlCnx = getConnectionSqlServer()
        cursor = SqlCnx.cursor()
        if strPassword is not None:
            strPassword = hashlib.sha256(bytes(strPassword, 'utf-8')).hexdigest()
        query = 'SELECT * FROM usuarios WHERE username = ? AND password = ?;'
        params = (strUserName, strPassword)
        cursor.execute(query, params)
        column_names = [column[0] for column in cursor.description]
        for row in cursor.fetchall():
            result = {}
            for idx, column in enumerate(row):
                result[column_names[idx]] = column
        SqlCnx.commit()
        if result is not None:
            
            access_token = create_access_token(identity={'username': result['username'], 'password': result['password']})
            if 'password' in result:
                del result['password']
            return {'intResponse': 200,"strAnswer": "Usuario econtrado", 'Result': result, 'token': access_token}
        else:
            return {"intResponse": 203, "strAnswer": "Usuario no econtrado"}
    except Exception as exception:
        print('login', exception)
        return {'intResponse': 500, 'strAnswer': 'Error login', 'Result': None}
    
def loginToken(strToken):
    try: 
        SqlCnx = getConnectionSqlServer()
        cursor = SqlCnx.cursor()
        data = decode_token(strToken, allow_expired=True)
        
        if data is not None:
            data = data['sub']
            query = 'SELECT * FROM usuarios WHERE username = ? AND password = ?;'
        params = (data['username'], data['password'])
        cursor.execute(query, params)
        column_names = [column[0] for column in cursor.description]
        for row in cursor.fetchall():
            result = {}
            for idx, column in enumerate(row):
                result[column_names[idx]] = column
        SqlCnx.commit()
        if result is not None:
            
            access_token = create_access_token(identity={'username': result['username'], 'password': result['password']})
            if 'password' in result:
                del result['password']
                return {'intResponse': 200,"strAnswer": "Usuario econtrado", 'Result': result, 'token': access_token}
            else:
                return {"intResponse": 203, "strAnswer": "Usuario no econtrado"}
        else:
            return {'intResponse': 205, 'Result': None}
    except Exception as exception:
        print('loginToken', exception)
        return {'intResponse': 500, 'strAnswer': 'Error loginToken', 'Result': None}