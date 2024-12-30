from django.db import models
from django.core.exceptions import ValidationError
import re

class Address(models.Model):
    line1 = models.CharField(max_length=255)
    line2 = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    pincode = models.CharField(max_length=6)

class BusinessDomain(models.Model):
    name = models.CharField(max_length=255)

class CustomUser(models.Model):
    name = models.CharField(max_length=255)
    contact_number = models.CharField(max_length=15)
    email = models.EmailField(unique=True, blank=True)
    address = models.OneToOneField(Address, on_delete=models.CASCADE, null=True, blank=True)

class Client(models.Model):
    name = models.CharField(max_length=255)
    gst_number = models.CharField(max_length=15)
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    contact_number = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    address = models.OneToOneField(Address, on_delete=models.CASCADE, null=True, blank=True)
    total_spend = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    business_domain = models.ForeignKey(BusinessDomain, on_delete=models.SET_NULL, blank=True, null=True)
    note = models.TextField(null=True, blank=True)

class Designation(models.Model):
    name = models.CharField(max_length=255)

class BankDetails(models.Model):
    account_number = models.CharField(max_length=20)
    bank_name = models.CharField(max_length=255)
    ifsc_code = models.CharField(max_length=11)


class Employee(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    designation = models.ForeignKey(Designation, on_delete=models.SET_NULL, null=True)
    joining_date = models.DateField()
    is_authorizer = models.BooleanField(default=False)
    signature = models.ImageField(upload_to='signatures/', null=True, blank=True)
    system_number = models.CharField(max_length=255, blank=True)
    bank_details = models.OneToOneField(BankDetails, on_delete=models.CASCADE, blank=True,null=True)


class Service(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    is_available = models.BooleanField(default=True)

class PaymentMode(models.Model):
    name = models.CharField(max_length=255)
    def __str__(self):
        return self.name


class PaymentTerm(models.Model):
    name = models.CharField(max_length=255)
    def __str__(self):
        return self.name

class Invoice(models.Model):
    number = models.CharField(max_length=255)
    place = models.CharField(max_length=255)
    date = models.DateField()
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    services = models.ManyToManyField('ServiceInvoice', related_name='invoices')
    payment_mode = models.ForeignKey(PaymentMode, on_delete=models.SET_NULL, null=True)
    payment_term = models.ForeignKey(PaymentTerm, on_delete=models.SET_NULL, null=True)
    estimated_completion_date = models.DateField()
    authorizer = models.ForeignKey(Employee, on_delete=models.SET_NULL, null=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2, default=0, blank=True)
    STATUS_CHOICES = [
        ("unsettled","Unsettled"),
        ("settled","settled"),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="unsettled")

    def save(self, *args, **kwargs):
        pattern = r'^[A-Za-z]{2}\d+$'
        if not re.match(pattern, self.number):
            raise ValidationError({'invoice_number': 'Invoice number must start with two alphabets followed by numbers.'})
        
        super().save(*args, **kwargs)

class ServiceInvoice(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()