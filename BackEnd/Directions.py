from BackEnd.directions.authDirections import authBluePrint
from BackEnd.directions.servicesDirections import servicesBluePrint

from BackEnd.generalInfo.Keys import jwtKey
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, get_jwt
from datetime import datetime, timezone, timedelta
from flask import request, json
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.register_blueprint(authBluePrint)
app.register_blueprint(servicesBluePrint)


app.config["JWT_SECRET_KEY"] = jwtKey
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

jwt = JWTManager(app)


@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        return response
    


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=6011, debug=True, threaded=True)