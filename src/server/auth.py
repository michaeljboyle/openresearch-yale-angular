import google.auth.transport.requests
import google.oauth2.id_token
import requests_toolbelt.adapters.appengine
import logging

# Use the App Engine Requests adapter. This makes sure that Requests uses
# URLFetch.
requests_toolbelt.adapters.appengine.monkeypatch()
HTTP_REQUEST = google.auth.transport.requests.Request()


# Error handler
class AuthError(Exception):
    def __init__(self, error, status_code):
        self.error = error
        self.status_code = status_code


def verify_token(request):
    # Verify Firebase auth.
    # [START verify_token]
    logging.info('Verifying token')
    id_token = request.headers['Authorization'].split(' ').pop()
    claims = google.oauth2.id_token.verify_firebase_token(
        id_token, HTTP_REQUEST)
    if not claims:
        raise AuthError('Unauthorized', 401)
    # [END verify_token]
