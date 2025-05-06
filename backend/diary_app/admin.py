from django.contrib import admin
from .models import Product, DeliveryLocation, Order

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'available']
    search_fields = ['name']

@admin.register(DeliveryLocation)
class DeliveryLocationAdmin(admin.ModelAdmin):
    list_display = ['location', 'price']
    search_fields = ['location']

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['product', 'mpesa_name', 'mpesa_code', 'total', 'created_at']
    search_fields = ['mpesa_name', 'mpesa_code']