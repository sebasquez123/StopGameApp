# Generated by Django 5.0.4 on 2024-05-25 05:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Game', '0012_alter_esparcimiento_dificultad_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='esparcimiento',
            name='estado_de_inicio',
            field=models.BooleanField(blank=True, default=False),
        ),
    ]