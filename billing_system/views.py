from rest_framework import viewsets
from .models import Client, Invoice, Service, Employee, PaymentMode, PaymentTerm, BusinessDomain, Designation
from .serializers import ClientSerializer, InvoiceSerializer, ServiceSerializer, EmployeeSerializer, PaymentModeSerializer, ClientListSerializer, InvoiceListSerializer, PaymentTermSerializer, EmployeeListSerializer, ServiceListSerializer, BusinessDomainSerializer, DesignationSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.db.models import F
from django.contrib.auth import authenticate, login, logout
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.decorators import action

class SessionAuthViewSet(viewsets.ViewSet):
    """
    A ViewSet for session-based login/logout.
    """

    @action(detail=False, methods=['post'], url_path='login')
    def login(self, request):
        """
        Handles user login using session authentication.
        """
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False, methods=['post'], url_path='logout')
    def logout(self, request):
        """
        Handles user logout.
        """
        logout(request)
        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    # permission_classes = [IsAuthenticated]
    http_method_names = ['get','post','delete','patch']

    def get_serializer_class(self):
        if self.action == 'list':
            return ClientListSerializer
        return ClientSerializer


class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    # permission_classes = [IsAuthenticated]
    http_method_names = ['get','post','delete']

    def get_serializer_class(self):
        if self.action == 'list':
            return InvoiceListSerializer
        return InvoiceSerializer


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    # permission_classes = [IsAuthenticated]
    http_method_names = ['get','post','delete','put']

    def get_serializer_class(self):
        if self.action == 'list':
            return ServiceListSerializer
        return ServiceSerializer


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    # permission_classes = [IsAuthenticated]
    http_method_names = ['get','post','delete','patch']

    def get_serializer_class(self):
        if self.action == 'list':
            return EmployeeListSerializer
        return EmployeeSerializer

class PaymentModeViewSet(viewsets.ModelViewSet):
    queryset = PaymentMode.objects.all()
    serializer_class = PaymentModeSerializer
    # permission_classes = [IsAuthenticated]
    http_method_names = ['get','post','delete','put']


class PaymentTermViewSet(viewsets.ModelViewSet):
    queryset = PaymentTerm.objects.all()
    serializer_class = PaymentTermSerializer
    # permission_classes = [IsAuthenticated]
    http_method_names = ['get','post','delete','put']


class DesignationViewSet(viewsets.ModelViewSet):
    queryset = Designation.objects.all()
    serializer_class = DesignationSerializer
    # permission_classes = [IsAuthenticated]
    http_method_names = ['get','post','delete','put']


class BusinessDomainViewSet(viewsets.ModelViewSet):
    queryset = BusinessDomain.objects.all()
    serializer_class = BusinessDomainSerializer
    # permission_classes = [IsAuthenticated]
    http_method_names = ['get','post','delete','put']



class InvoiceDropdownDataView(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        latest_invoice = Invoice.objects.order_by('-id').first()
        if not latest_invoice:
            latest_invoice_number = 1
        else:
            latest_invoice_number = latest_invoice.id + 1
        payment_terms = PaymentTerm.objects.all().values()  
        payment_modes = PaymentMode.objects.all().values()  
        clients = Client.objects.all().values('id', 'name') 
        services = Service.objects.filter(is_available=True).values('id', 'name','cost')
        authorizers = Employee.objects.filter(is_authorizer = True).annotate(name=F('user__name')).values('id','name')

        data = {
            'invoice_number': str(latest_invoice_number).zfill(3),
            'payment_terms': list(payment_terms),
            'payment_modes': list(payment_modes),
            'clients': list(clients),
            'services': list(services),
            'authorizer': list(authorizers)

        }

        return Response(data)