# Generated by Django 5.0.4 on 2024-05-04 17:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Game', '0004_alter_gamer_options_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='gamer',
            name='score',
            field=models.IntegerField(default=0),
        ),
    ]