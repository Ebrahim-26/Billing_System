from django.db import models

# Address Model
class Address(models.Model):
    line1 = models.CharField(max_length=255)
    line2 = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    pincode = models.CharField(max_length=6)

# Business Domain Model
class BusinessDomain(models.Model):
    name = models.CharField(max_length=255)

# CustomUser Model
class CustomUser(models.Model):
    name = models.CharField(max_length=255)
    contact_number = models.CharField(max_length=15)
    email = models.EmailField(unique=True, blank=True)
    address = models.OneToOneField(Address, on_delete=models.CASCADE, null=True, blank=True)

# Client Model
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

# Designation Model
class Designation(models.Model):
    name = models.CharField(max_length=255)

# BankDetails Model
class BankDetails(models.Model):
    account_number = models.CharField(max_length=20)
    bank_name = models.CharField(max_length=255)
    ifsc_code = models.CharField(max_length=11)


# Employee Model
class Employee(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    designation = models.ForeignKey(Designation, on_delete=models.SET_NULL, null=True)
    joining_date = models.DateField()
    is_authorizer = models.BooleanField(default=False)
    signature = models.ImageField(upload_to='signatures/', null=True, blank=True)
    system_number = models.CharField(max_length=255)
    bank_details = models.OneToOneField(BankDetails, on_delete=models.CASCADE)
    def __str__(self):
        return self.name, self.designation, self.signature

# Service Model
class Service(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    is_available = models.BooleanField(default=True)

# PaymentMode Model
class PaymentMode(models.Model):
    name = models.CharField(max_length=255)
    def __str__(self):
        return self.name
# PaymentTerms Model
class PaymentTerm(models.Model):
    name = models.CharField(max_length=255)
    def __str__(self):
        return self.name

# Invoice Model
class Invoice(models.Model):
    number = models.CharField(max_length=255)
    place = models.CharField(max_length=255)
    date = models.DateField()
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    payment_mode = models.ForeignKey(PaymentMode, on_delete=models.SET_NULL, null=True)
    payment_terms = models.ForeignKey(PaymentTerm, on_delete=models.SET_NULL, null=True)
    estimated_completion_date = models.DateField()
    authorizer = models.ForeignKey(Employee, on_delete=models.SET_NULL, null=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2)
    STATUS_CHOICES = [
        ("unsettled","Unsettled"),
        ("settled","settled"),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="unsettled")
