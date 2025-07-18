# Generated by Django 5.1.4 on 2024-12-30 17:35

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('billing_system', '0002_alter_employee_bank_details_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='client',
            old_name='business_name',
            new_name='name',
        ),
        migrations.RenameField(
            model_name='invoice',
            old_name='payment_terms',
            new_name='payment_term',
        ),
        migrations.RemoveField(
            model_name='invoice',
            name='service',
        ),
        migrations.CreateModel(
            name='ServiceInvoice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField()),
                ('invoice', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='billing_system.invoice')),
                ('service', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='billing_system.service')),
            ],
        ),
        migrations.AddField(
            model_name='invoice',
            name='services',
            field=models.ManyToManyField(related_name='invoices', to='billing_system.serviceinvoice'),
        ),
    ]
