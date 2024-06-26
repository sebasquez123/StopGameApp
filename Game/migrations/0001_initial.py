# Generated by Django 5.0.4 on 2024-04-26 05:37

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='animal',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('animal', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='apellido',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('apellido', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='ciudad',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('ciudad', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='color',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('color', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='cosa',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('cosa', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='fruta',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('fruta', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='nombre',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='gamer',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('dificult', models.CharField(max_length=10)),
                ('time', models.DateTimeField(default=django.utils.timezone.now)),
                ('nickname', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-dificult', 'time'],
            },
        ),
    ]
