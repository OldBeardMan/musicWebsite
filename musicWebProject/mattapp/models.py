from django.db import models

class Subscriber(models.Model):
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.email

class Message(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Message from {self.email}'

class Order(models.Model):
    PICKUP_OPTIONS = (
        ('delivery', 'Dostawa'),
        ('pickup', 'Odbiór osobisty'),
    )

    name = models.CharField(max_length=100, verbose_name="Imię")
    surname = models.CharField(max_length=100, verbose_name="Naziwsko",) 
    email = models.EmailField(verbose_name="Adres Email")
    address = models.TextField(blank=True, null=True, verbose_name="Adres dotawy")
    pickup_option = models.CharField(max_length=10, choices=PICKUP_OPTIONS, default='delivery', verbose_name="Dostawa, czy odbiór osobisty?")

    def __str__(self):
        return f"Order by {self.name} ({self.email})"