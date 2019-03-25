# Generated by Django 2.0.6 on 2019-02-25 18:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='aplicacion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre_aplicacion', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='bodega',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ubicacion', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='cargo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre_cargo', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='creacion_aplicacion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ticket', models.IntegerField()),
                ('persona_relacionada', models.CharField(max_length=50)),
                ('aplicacion_relacionada', models.CharField(max_length=50)),
                ('usuario', models.CharField(max_length=50)),
                ('hora', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='eliminacion_aplicacion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ticket', models.IntegerField()),
                ('persona_relacionada', models.CharField(max_length=50)),
                ('aplicacion_relacionada', models.CharField(max_length=50)),
                ('usuario', models.CharField(max_length=50)),
                ('hora', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='historico_creacion_persona',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hora', models.DateTimeField(auto_now_add=True)),
                ('persona', models.CharField(max_length=100)),
                ('aplicaciones', models.CharField(max_length=500)),
                ('cargo', models.CharField(max_length=100)),
                ('ubicacion', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='historico_eliminacion_persona',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hora', models.DateTimeField(auto_now_add=True)),
                ('persona', models.CharField(max_length=100)),
                ('aplicaciones', models.CharField(max_length=500)),
                ('cargo', models.CharField(max_length=100)),
                ('ubicacion', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='persona',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre_completo', models.CharField(max_length=100)),
                ('aplicaciones', models.ManyToManyField(to='Entidades.aplicacion')),
                ('cargo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Entidades.cargo')),
                ('ubicacion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Entidades.bodega')),
            ],
        ),
        migrations.CreateModel(
            name='usuario',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('usuario', models.CharField(max_length=50)),
                ('ticket', models.IntegerField()),
                ('aplicacion_relacionada', models.ManyToManyField(to='Entidades.aplicacion')),
                ('persona_relacionada', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Entidades.persona')),
            ],
        ),
    ]