DEBUG = False
ALLOWED_HOSTS = ['www.tarvizdigimart.com']

CORS_ALLOWED_ORIGINS = [
    'https://www.tarvizdigimart.com',
]

CSRF_TRUSTED_ORIGINS = [
    'https://www.tarvizdigimart.com',
]

CSRF_COOKIE_SECURE = True
CSRF_COOKIE_HTTPONLY = True

SESSION_COOKIE_SECURE = True
SESSION_COOKIE_HTTPONLY = True