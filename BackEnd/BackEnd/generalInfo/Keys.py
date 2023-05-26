import pymysql
import pyodbc
# BD
jwtKey = 'cRm_3Da3U6MB7THbdA52K3d'
strDBHost = "localhost"
strDBPort = 3306
strDBUser = "root"
strDBPassword = ""
strDBName = "crm_3"
strCharset = "utf8mb4"

def getConnectionMYSQL():
    return pymysql.connect(
        host=strDBHost,
        port=strDBPort,
        user=strDBUser,
        password=strDBPassword,
        db=strDBName,
        charset="utf8mb4",
        cursorclass=pymysql.cursors.DictCursor
    )

server ='LAPTOP-762S618E\SQLEXPRESS'
database = 'bosch'
username = 'sa'
password = '1234'
def getConnectionSqlServer():
    return pyodbc.connect(
        'DRIVER={SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+ password
    )