import os
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

# Static files
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Add Next.js static files directory
NEXT_STATIC_DIR = os.path.join(BASE_DIR, 'billing_portal_fe', '.next', 'static')
STATICFILES_DIRS = [
    NEXT_STATIC_DIR,  # Add Next.js static files to Django
]

# Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
