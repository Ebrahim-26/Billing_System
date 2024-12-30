from rest_framework import viewsets
from .models import Client, Invoice, Service, Employee, PaymentMode, PaymentTerm, Address, BusinessDomain
from .serializers import ClientSerializer, InvoiceSerializer, ServiceSerializer, EmployeeSerializer, PaymentModeSerializer, AddressSerializer, BusinessDomainSerializer, PaymentTermSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer


class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


class PaymentModeViewSet(viewsets.ModelViewSet):
    queryset = PaymentMode.objects.all()
    serializer_class = PaymentModeSerializer


class PaymentTermViewSet(viewsets.ModelViewSet):
    queryset = PaymentTerm.objects.all()
    serializer_class = PaymentTermSerializer



class InvoiceDropdownDataView(APIView):
    permission_classes = [IsAuthenticated]

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

        data = {
            'invoice_number': str(latest_invoice_number).zfill(3),
            'payment_terms': list(payment_terms),
            'payment_modes': list(payment_modes),
            'clients': list(clients),
            'services': list(services),

        }

        return Response(data)