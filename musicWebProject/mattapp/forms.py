from django import forms
from .models import Subscriber, Message, Order

class SubscribeForm(forms.ModelForm):
    class Meta:
        model = Subscriber
        fields = ['email']
        widgets = {
            'email': forms.EmailInput(attrs={
                'class': 'custom-input',
                'placeholder': 'awesomeperson@email.net'
            }),
        }
        labels = {
            'email': '',
        }

class MessageForm(forms.ModelForm):
    class Meta:
        model = Message
        fields = ['name', 'email', 'message']
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter your name...'
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter your email address...'
            }),
            'message': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 4,
                'placeholder': 'Enter your message...'
            }),
        }

class PurchaseForm(forms.ModelForm):
    class Meta:
        model = Order
        fields = ['name', 'surname', 'email', 'address', 'pickup_option']

    def clean(self):
        cleaned_data = super().clean()
        pickup_option = cleaned_data.get('pickup_option')
        address = cleaned_data.get('address')

        if pickup_option == 'delivery' and not address:
            self.add_error('address', 'Adres jest wymagany do dostawy!')

        return cleaned_data