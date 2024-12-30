from rest_framework import serializers
from .models import CustomUser, Client, Invoice, Service, Employee, PaymentMode, PaymentTerm, Address, BusinessDomain

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['name','email','contact_number']


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'description', 'cost', 'is_available']

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

class InvoiceSerializer(serializers.ModelSerializer):
    client = ClientSerializer()
    service = ServiceSerializer(many=True)
    payment_mode = serializers.StringRelatedField()
    payment_terms = serializers.StringRelatedField()
    authorizer = AuthorizerSerializer()
    
    class Meta:
        model = Invoice
        fields = ['id', 'number', 'client', 'service', 'payment_mode', 'payment_terms', 'estimated_completion_date', 'authorizer', 'total_amount', 'amount_paid', 'status']

class BusinessDomainSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessDomain
        fields = ['id', 'name']

class DropdownDataSerializer(serializers.Serializer):
    payment_terms = PaymentTermSerializer(many=True)
    payment_modes = PaymentModeSerializer(many=True)
    clients = ClientSerializer(many=True)

    def to_representation(self, instance):
        # Custom data fetching logic
        data = super().to_representation(instance)
        
        # You can fetch data here for dropdowns
        data['payment_terms'] = PaymentTerm.objects.all()
        data['payment_modes'] = PaymentMode.objects.all()
        data['clients'] = Client.objects.all().values('id', 'user__name')
        
        return data
