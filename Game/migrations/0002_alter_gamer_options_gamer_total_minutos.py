# Generated by Django 5.0.4 on 2024-04-27 03:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Game', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='gamer',
            options={'ordering': ['dificult', 'time']},
        ),
        migrations.AddField(
            model_name='gamer',
            name='total_minutos',
            field=models.IntegerField(default=0),
        ),
    ]
