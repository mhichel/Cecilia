from django import forms

from apps.Entidades.models import aplicacion, cargo, ubicacion, historico_creacion_persona, persona, eliminacion_aplicacion, creacion_aplicacion, usuario, historico_eliminacion_persona

class PersonaForm_addaplicacion(forms.ModelForm):
    class Meta:
        model = persona

        fields = [
            'nombre_completo',
            'aplicaciones',
            'cargo',
            'ubicacion',
            'centro',
        ]

        widgets = {
            'aplicaciones': forms.CheckboxSelectMultiple(attrs={'class': 'checkbox_aplicaciones checkbox'}),
            'nombre_completo': forms.TextInput(attrs={'class': 'nombre_completo_de_adicion_aplicacion'}),
            'cargo': forms.TextInput(attrs={'class': 'cargo_de_adicion_aplicacion'}),
            'ubicacion': forms.TextInput(attrs={'class': 'ubicacion_de_adicion_aplicacion'}),
            'centro': forms.TextInput(attrs={'class': 'centro_de_adicion_aplicacion'}),
        }

class PersonaForm(forms.ModelForm):
    class Meta:
        model = persona
        fields = [
            'nombre_completo',
            'aplicaciones',
            'cargo',
            'ubicacion',
            'centro',
        ]

        widgets = {
            'aplicaciones': forms.CheckboxSelectMultiple(attrs={'class': 'checkbox_aplicaciones_crear_persona_nueva checkbox','id': 'id_aplicaciones_de_persona_nueva'}),
            'nombre_completo': forms.TextInput(attrs={'id': 'id_nombre_completo_persona_nueva','class':'form-control'}),
            'cargo': forms.Select(attrs={'id': 'id_cargo_persona_nueva','class':'form-control'}),
            'ubicacion': forms.Select(attrs={'id': 'id_ubicacion_persona_nueva','class':'form-control'}),
            'centro': forms.Select(attrs={'id': 'id_centro_persona_nueva','class':'form-control'}),
        }

class EditarPersonaForm(forms.ModelForm):
    class Meta:
        model = persona
        fields = [
            'nombre_completo',
            'cargo',
            'ubicacion',
            'centro',
        ]

        widgets = {
            'nombre_completo': forms.TextInput(attrs={'class': 'form-control'}),
            'cargo': forms.Select(attrs={'class': 'form-control'}),
            'ubicacion': forms.Select(attrs={'class': 'form-control'}),
            'centro': forms.Select(attrs={'class': 'form-control'}),
        }

class UsuarioForm(forms.ModelForm):
    class Meta:
        model = usuario

        fields = [
            'usuario',
            'persona_relacionada',
            'aplicacion_relacionada',
            'ticket',
        ]


class HistoricoForm_creacion_persona(forms.ModelForm):
    class Meta:
        model = historico_creacion_persona

        fields = [
            'persona',
            'aplicaciones',
            'cargo',
            'ubicacion',
            'centro',
         ]

class HistoricoForm_eliminacion_persona(forms.ModelForm):
    class Meta:
        model = historico_eliminacion_persona

        fields = [
            'persona',
            'aplicaciones',
            'cargo',
            'ubicacion',
            'centro',
        ]


class AplicacionForm(forms.ModelForm):
    class Meta:
        model = creacion_aplicacion

        fields = [
            'ticket',
            'persona_relacionada',
            'aplicacion_relacionada',
            'usuario',
        ]

class AplicacionForm_eliminacion(forms.ModelForm):
    class Meta:
        model = eliminacion_aplicacion

        fields = [
            'ticket',
            'persona_relacionada',
            'aplicacion_relacionada',
            'usuario',
        ]
