# Generated by Django 5.0.4 on 2024-05-19 23:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Game', '0006_remove_gamer_final_time_remove_gamer_initial_time'),
    ]

    operations = [
        migrations.CreateModel(
            name='servidordejuego',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('codigo', models.IntegerField(default=0)),
                ('nick1', models.CharField(max_length=20)),
                ('nick2', models.CharField(max_length=20)),
                ('nick3', models.CharField(max_length=20)),
                ('nick4', models.CharField(max_length=20)),
                ('nick5', models.CharField(max_length=20)),
                ('dificultad', models.CharField(max_length=20)),
            ],
        ),
    ]