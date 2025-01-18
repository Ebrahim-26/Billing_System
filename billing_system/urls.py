from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SessionAuthViewSet, ClientViewSet, InvoiceViewSet, ServiceViewSet, EmployeeViewSet, PaymentModeViewSet, PaymentTermViewSet, InvoiceDropdownDataView, DesignationViewSet, BusinessDomainViewSet
from django.contrib import admin
from django.urls import path, include
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="API Documentation",
        default_version="v1",
        description="Test description",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@local.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

router = DefaultRouter()
router.register(r'clients', ClientViewSet)
router.register(r'invoices', InvoiceViewSet)
router.register(r'services', ServiceViewSet)
router.register(r'employees', EmployeeViewSet)
router.register(r'payment_modes', PaymentModeViewSet)
router.register(r'payment_terms', PaymentTermViewSet)
router.register(r'designation', DesignationViewSet)
router.register(r'business_domain', BusinessDomainViewSet)
router.register(r'auth', SessionAuthViewSet, basename='auth')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/get-invoice-fields/', InvoiceDropdownDataView.as_view(), name='get-invoice-fields'),
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
    path("swagger.json", schema_view.without_ui(cache_timeout=0), name="schema-json"),
]
