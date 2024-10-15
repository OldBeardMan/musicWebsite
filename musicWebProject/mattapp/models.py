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
        ('delivery', 'Delivery'),
        ('pickup', 'Pickup in person'),
    )

    name = models.CharField(max_length=100, verbose_name="Name")
    surname = models.CharField(max_length=100, verbose_name="Surname", default="Kowalski")
    email = models.EmailField(verbose_name="Email Address")
    address = models.TextField(blank=True, null=True, verbose_name="Delivery Address")
    pickup_option = models.CharField(max_length=10, choices=PICKUP_OPTIONS, default='delivery', verbose_name="Delivery or Pickup")

    def __str__(self):
        return f"Order by {self.name} ({self.email})"