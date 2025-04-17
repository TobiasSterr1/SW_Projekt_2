from flask import request
from google.auth.transport import requests
import google.oauth2.id_token


def get_logged_user_google_id():
    firebase_request_adapter = requests.Request()
    id_token = request.cookies.get("token")
    claims = google.oauth2.id_token.verify_firebase_token(
        id_token,
        firebase_request_adapter
    )
    google_user_id = claims.get("user_id")
    return google_user_id