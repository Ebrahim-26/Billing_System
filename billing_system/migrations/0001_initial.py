# Generated by Django 5.1.4 on 2024-12-29 14:07

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('line1', models.CharField(max_length=255)),
                ('line2', models.CharField(blank=True, max_length=255, null=True)),
                ('city', models.CharField(max_length=100)),
                ('state', models.CharField(max_length=100)),
                ('district', models.CharField(max_length=100)),
                ('pincode', models.CharField(max_length=6)),
            ],
        ),
        migrations.CreateModel(
            name='BankDetails',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('account_number', models.CharField(max_length=20)),
                ('bank_name', models.CharField(max_length=255)),
                ('ifsc_code', models.CharField(max_length=11)),
            ],
        ),
        migrations.CreateModel(
            name='BusinessDomain',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Designation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='PaymentMode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='PaymentTerm',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('cost', models.DecimalField(decimal_places=2, max_digits=10)),
                ('is_available', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('contact_number', models.CharField(max_length=15)),
                ('email', models.EmailField(blank=True, max_length=254, unique=True)),
                ('address', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='billing_system.address')),
            ],
        ),
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('business_name', models.CharField(max_length=255)),
                ('gst_number', models.CharField(max_length=15)),
                ('contact_number', models.CharField(max_length=15)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('total_spend', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('note', models.TextField(blank=True, null=True)),
                ('address', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='billing_system.address')),
                ('business_domain', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='billing_system.businessdomain')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='billing_system.customuser')),
            ],
        ),
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('joining_date', models.DateField()),
                ('is_authorizer', models.BooleanField(default=False)),
                ('signature', models.ImageField(blank=True, null=True, upload_to='signatures/')),
                ('system_number', models.CharField(max_length=255)),
                ('bank_details', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='billing_system.bankdetails')),
                ('designation', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='billing_system.designation')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='billing_system.customuser')),
            ],
        ),
        migrations.CreateModel(
            name='Invoice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.CharField(max_length=255)),
                ('place', models.CharField(max_length=255)),
                ('date', models.DateField()),
                ('estimated_completion_date', models.DateField()),
                ('total_amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('amount_paid', models.DecimalField(decimal_places=2, max_digits=10)),
                ('status', models.CharField(choices=[('unsettled', 'Unsettled'), ('settled', 'settled')], default='unsettled', max_length=10)),
                ('authorizer', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='billing_system.employee')),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='billing_system.client')),
                ('payment_mode', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='billing_system.paymentmode')),
                ('payment_terms', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='billing_system.paymentterm')),
                ('service', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='billing_system.service')),
            ],
        ),
    ]
