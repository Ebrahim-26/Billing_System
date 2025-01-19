
DEBUG = True
ALLOWED_HOSTS = ['localhost', '127.0.0.1','13.127.183.30']

print("in DEV settings")
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
]

CSRF_TRUSTED_ORIGINS = [
    'http://localhost:3000',  
]
