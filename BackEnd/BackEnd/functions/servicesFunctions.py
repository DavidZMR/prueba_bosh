import hashlib
import json
from flask_jwt_extended import create_access_token, decode_token

from  BackEnd.generalInfo.Keys import getConnectionSqlServer
import BackEnd.generalInfo.Helpers as HelperFunctions
import BackEnd.generalInfo.ResponseMessages as ResponseMessages


def get():
    try:
        SqlCnx = getConnectionSqlServer()
        cursor = SqlCnx.cursor()
        query = '''
            SELECT * FROM usuarios;
        '''
        params = ()
        cursor.execute(query,params)
        
        column_names = [column[0] for column in cursor.description]
        results = []
        for row in cursor.fetchall():
            result = {}
            for idx, column in enumerate(row):
                result[column_names[idx]] = column
            results.append(result)
        SqlCnx.commit()
        if results is not None:
            return {'intResponse': 200, 'strAnswer': 'Se encontraron usuarios', 'Result': results}
        else:
            return {'intResponse': 205, 'strAnswer': 'No se encontraron usuarios', 'Result': None}
    except Exception as exception:
        print('get', exception)
        return {'intResponse': 500, 'strAnswer': 'Error get', 'Result': None}

def getRoomsDetails(id):
    try:
        SqlCnx = getConnectionSqlServer()
        cursor = SqlCnx.cursor()
        query = '''
            SELECT * FROM salas WHERE idsala = ?;
        '''
        params = (id)
        cursor.execute(query,params)
        
        column_names = [column[0] for column in cursor.description]
        
        for row in cursor.fetchall():
            sala = {}
            for idx, column in enumerate(row):
                sala[column_names[idx]] = column
            
        
        if sala is not None:
            query = '''
                SELECT * FROM horarios WHERE idSala = ? and status = 'disponible';
            '''
            params = (id)
            cursor.execute(query,params)
        
            column_names = [column[0] for column in cursor.description]
            horarios = []
            for row in cursor.fetchall():
                result = {}
                for idx, column in enumerate(row):
                    result[column_names[idx]] = column
                horarios.append(result)
            SqlCnx.commit()
            return {'intResponse': 200, 'strAnswer': 'Se encontraron detalles de la sala', 'Result': {'detalles': sala, 'horarios': horarios}}
        else:
            return {'intResponse': 205, 'strAnswer': 'No se encontraron detalles de la sala', 'Result': None}
    except Exception as exception:
        print('getRoomsDetails', exception)
        return {'intResponse': 500, 'strAnswer': 'Error getRoomsDetails', 'Result': None}
    
def getReservations(id):
    try:
        SqlCnx = getConnectionSqlServer()
        cursor = SqlCnx.cursor()
        query = '''
            SELECT R.descripcion as descripcion, R.idSala,R.idreservacion, S.nombre as sala, S.capacidad as capacidad FROM reservaciones R
            join salas S on S.idsala = R.idsala
            WHERE R.idUsuario = ?;
        '''
        params = (id)
        cursor.execute(query,params)
        
        column_names = [column[0] for column in cursor.description]
        results = []
        for row in cursor.fetchall():
            result = {}
            for idx, column in enumerate(row):
                result[column_names[idx]] = column
            results.append(result)
            
        
        if results is not None:
            for result in results:
                id_sala = result['idSala']
                query = '''
                    SELECT H.* FROM horarios H 
                    join asignaciones A on A.idHorario = H.idhorario
                    join reservaciones R on A.idReservacion = R.idreservacion
                    WHERE R.idSala = ? and H.status = 'no disponible';
                '''
                params = (id_sala)
                cursor.execute(query,params)
                column_names = [column[0] for column in cursor.description]
                horarios = []
                for row in cursor.fetchall():
                    horario = {}
                    for idx, column in enumerate(row):
                        horario[column_names[idx]] = column
                        
                    horarios.append(horario)
                result['horarios'] = horarios
            SqlCnx.commit()
            return {'intResponse': 200, 'strAnswer': 'Se encontraron reservaciones', 'Result':  results}
        else:
            return {'intResponse': 205, 'strAnswer': 'No se encontraron reservaciones', 'Result': None}
    except Exception as exception:
        print('getReservations', exception)
        return {'intResponse': 500, 'strAnswer': 'Error getReservations', 'Result': None}
    
def getRooms():
    try:
        SqlCnx = getConnectionSqlServer()
        cursor = SqlCnx.cursor()
        query = '''
            SELECT * FROM salas;
        '''
        params = ()
        cursor.execute(query,params)
        
        column_names = [column[0] for column in cursor.description]
        results = []
        for row in cursor.fetchall():
            result = {}
            for idx, column in enumerate(row):
                result[column_names[idx]] = column
            results.append(result)
        if results is not None:
            for result in results:
                id_sala = result['idsala']
                query = '''
                    SELECT * FROM horarios WHERE idSala = ?;
                '''
                params = (id_sala)
                cursor.execute(query,params)
                column_names = [column[0] for column in cursor.description]
                horarios = []
                for row in cursor.fetchall():
                    horario = {}
                    for idx, column in enumerate(row):
                        horario[column_names[idx]] = column
                        
                    horarios.append(horario)
                result['horarios'] = horarios
            SqlCnx.commit()
            return {'intResponse': 200, 'strAnswer': 'Se encontraron salas', 'Result': results}
        else:
            return {'intResponse': 205, 'strAnswer': 'No se encontraron salas', 'Result': None}
    except Exception as exception:
        print('getRooms', exception)
        return {'intResponse': 500, 'strAnswer': 'Error getRooms', 'Result': None}

def getSelectRooms():
    try:
        SqlCnx = getConnectionSqlServer()
        cursor = SqlCnx.cursor()
        query = '''
            SELECT idsala as id, nombre FROM salas;
        '''
        params = ()
        cursor.execute(query,params)
        
        column_names = [column[0] for column in cursor.description]
        results = []
        for row in cursor.fetchall():
            result = {}
            for idx, column in enumerate(row):
                result[column_names[idx]] = column
            results.append(result)
        SqlCnx.commit()
        if results is not None:
            return {'intResponse': 200, 'strAnswer': 'Se encontraron salas para select', 'Result': results}
        else:
            return {'intResponse': 205, 'strAnswer': 'No se encontraron salas para select', 'Result': None}
    except Exception as exception:
        print('getSelectRooms', exception)
        return {'intResponse': 500, 'strAnswer': 'Error getSelectRooms', 'Result': None}
    
def registerUser(strUserName, strMail, strPassword):
    try:
        SqlCnx = getConnectionSqlServer()
        cursor = SqlCnx.cursor()
        query = '''
            select * from usuarios where mail = ?;
        '''
        params = ( strMail)
        cursor.execute(query,params)
        usuario = cursor.fetchone()
        if usuario is not None:
            return {'intResponse': 204, 'strAnswer': 'correo ya agregado', 'Result': None}
        query = '''
            select * from usuarios where username = ?;
        '''
        params = ( strUserName )
        cursor.execute(query,params)
        usuario = cursor.fetchone()
        if usuario is not None:
            return {'intResponse': 205, 'strAnswer': 'username ya agregado', 'Result': None}
        if strPassword is not None:
            strPassword = hashlib.sha256(bytes(strPassword, 'utf-8')).hexdigest()
        query = '''
            INSERT INTO usuarios (username,mail,password)
            VALUES(?,?,?);
        '''
        params = (strUserName, strMail, strPassword)
        cursor.execute(query,params)
        lastId = cursor.rowcount
        SqlCnx.commit()
        if lastId is not None:
            return {'intResponse': 200, 'strAnswer': 'usuario agregado correctamente', 'Result': None}
        else:
            return {'intResponse': 203, 'strAnswer': 'usuario no agregado', 'Result': None}
    
    except Exception as exception:
        print('registerUser', exception)
        return {'intResponse': 500, 'strAnswer': 'Error registerUser', 'Result': None}
    
def registerRooms(name, capacity,horarios):
    try:
        SqlCnx = getConnectionSqlServer()
        cursor = SqlCnx.cursor()
        
        query = '''
            select * from salas where nombre = ?;
        '''
        params = (name)
        cursor.execute(query,params)
        room = cursor.fetchone()
        if room is not None:
            return {'intResponse': 204, 'strAnswer': 'sala ya agregada', 'Result': None}
        
        query = '''
            INSERT INTO salas (nombre,capacidad)
            VALUES(?,?);
        '''
        params = (name, capacity)
        cursor.execute(query,params)
        lastId = cursor.rowcount

        if lastId is not None:
            query = 'select * from salas where nombre = ?;'
            params = (name)
            cursor.execute(query, params)
            column_names = [column[0] for column in cursor.description]
            for row in cursor.fetchall():
                result = {}
                for idx, column in enumerate(row):
                    result[column_names[idx]] = column
            for horario in horarios:
                query = '''
                    INSERT INTO horarios (idSala,horario,status)
                    VALUES(?,?,'disponible');
                '''
                params = (result['idsala'], horario)
                cursor.execute(query,params)
            SqlCnx.commit()
            return {'intResponse': 200, 'strAnswer': 'sala agregada correctamente', 'Result': None}
        else:
            return {'intResponse': 203, 'strAnswer': 'sala no agregada', 'Result': None}
    
    except Exception as exception:
        print('registerRooms', exception)
        return {'intResponse': 500, 'strAnswer': 'Error registerRooms', 'Result': None}
    
def registerReservations(sala,idusuario,shedules,descripcion):
    try:
        SqlCnx = getConnectionSqlServer()
        cursor = SqlCnx.cursor()
        
        query = '''
            INSERT INTO reservaciones (idUsuario,idSala,descripcion)
            VALUES(?,?,?);
        '''
        params = (idusuario,sala,descripcion)
        cursor.execute(query,params)

        cursor.execute("SELECT IDENT_CURRENT('reservaciones')")
        lastId = cursor.fetchone()[0]
        if lastId is not None:
            for horario in shedules:
                query = '''
                    INSERT INTO asignaciones (idReservacion,idHorario)
                    VALUES(?,?);
                '''
                params = (lastId, horario)
                cursor.execute(query,params)
                query = '''
                    UPDATE horarios SET status = 'no disponible'
                    where idhorario = ?;
                '''
                params = (horario)
                cursor.execute(query,params)
            SqlCnx.commit()
            return {'intResponse': 200, 'strAnswer': 'reservacion agregada correctamente', 'Result': None}
        else:
            return {'intResponse': 203, 'strAnswer': 'reservacion no agregada', 'Result': None}
    
    except Exception as exception:
        print('registerReservations', exception)
        return {'intResponse': 500, 'strAnswer': 'Error registerReservations', 'Result': None}