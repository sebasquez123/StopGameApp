# Generated by Django 5.0.4 on 2024-05-19 23:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Game', '0007_servidordejuego'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='servidordejuego',
            new_name='servidor',
        ),
    ]
