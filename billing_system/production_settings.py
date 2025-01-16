DEBUG = False
ALLOWED_HOSTS = ['www.tarvizdigimart.com','13.127.183.30']

CORS_ALLOWED_ORIGINS = [
    'https://www.tarvizdigimart.com',
    "http://13.127.183.30",
    "https://13.127.183.30",
]

CSRF_TRUSTED_ORIGINS = [
    'https://www.tarvizdigimart.com',
    "http://13.127.183.30",
    "https://13.127.183.30",
]

CSRF_COOKIE_SECURE = True
CSRF_COOKIE_HTTPONLY = True

SESSION_COOKIE_SECURE = True
SESSION_COOKIE_HTTPONLY = True

DEBUG = True
