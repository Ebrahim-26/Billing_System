from rest_framework import serializers
from .models import CustomUser, Client, Invoice, Service, Employee, PaymentMode, PaymentTerm, Address, BusinessDomain, ServiceInvoice

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['name','email','contact_number']


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'description', 'cost', 'is_available']

class ServiceNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name','cost']

class EmployeeSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()
    
    class Meta:
        model = Employee
        fields = ['id', 'user', 'designation', 'joining_date', 'is_authorizer', 'signature', 'system_number', 'bank_details']


class AuthorizerSerializer(serializers.ModelSerializer):
    designation = serializers.StringRelatedField()  # Use the designation's name directly

    class Meta:
        model = Employee
        fields = ['user', 'designation', 'signature']

class PaymentModeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMode
        fields = ['id', 'name']

class PaymentTermSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentTerm
        fields = ['id', 'name']

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['line1', 'line2', 'city', 'state', 'district', 'pincode']

class ClientSerializer(serializers.ModelSerializer):
    address = AddressSerializer()
    user = CustomUserSerializer()
    class Meta:
        model = Client
        fields = ['id', 'name', 'gst_number', 'user', 'contact_number', 'email', 'address', 'total_spend', 'business_domain', 'note']

class ServiceInvoiceSerializer(serializers.ModelSerializer):
    service_name = serializers.CharField(source='service.name', read_only=True)
    cost = serializers.DecimalField(source='service.cost', read_only=True,max_digits=10, decimal_places=2)

    class Meta:
        model = ServiceInvoice
        fields = ['id', 'service', 'service_name', 'quantity', 'cost']

class InvoiceSerializer(serializers.ModelSerializer):
    client_id = serializers.PrimaryKeyRelatedField(queryset=Client.objects.all(), write_only = True)
    client = ClientSerializer(read_only = True)
    service_details = serializers.ListField(
        child=serializers.DictField(child=serializers.IntegerField()), write_only=True
    )
    services = ServiceInvoiceSerializer(many=True, read_only=True)
    payment_mode_id = serializers.PrimaryKeyRelatedField(queryset=PaymentMode.objects.all(), write_only=True)
    payment_mode = PaymentModeSerializer(read_only = True)
    payment_term_id = serializers.PrimaryKeyRelatedField( queryset=PaymentTerm.objects.all(), write_only=True)
    payment_term = PaymentTermSerializer(read_only = True)
    authorizer_id = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), write_only = True)

    
    class Meta:
        model = Invoice
        fields = ['id', 'number', 'client','client_id', 'services','service_details', 'payment_mode','payment_mode_id', 'payment_term','payment_term_id', 'estimated_completion_date', 'authorizer', 'authorizer_id','total_amount', 'amount_paid', 'status', 'date']
    
    def create(self, validated_data):
        service_details = validated_data.pop('service_details')
        authorizer = validated_data.pop('authorizer_id')
        client = validated_data.pop('client_id')
        payment_term = validated_data.pop('payment_term_id')
        payment_mode = validated_data.pop('payment_mode_id')
        invoice = Invoice.objects.create(**validated_data, authorizer=authorizer, client=client, payment_term=payment_term, payment_mode=payment_mode)
        service_ids = []
        for service_detail in service_details:
            service_id=service_detail['service_id']
            service = Service.objects.get(id=service_id)
            quantity = service_detail['quantity']
            service_invoice = ServiceInvoice.objects.create(invoice=invoice, service=service, quantity=quantity)
            service_ids.append(service_invoice)
        invoice.services.set(service_ids)
        return invoice
class BusinessDomainSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessDomain
        fields = ['id', 'name']


