from django.apps import apps
from django.contrib import admin

all_models = apps.get_models()
for model in all_models:
    if model not in admin.site._registry:
        admin.site.register(model)