from django.contrib import admin
from .models import Subscriber, Message, Order

admin.site.register(Subscriber)
admin.site.register(Message)
admin.site.register(Order)

