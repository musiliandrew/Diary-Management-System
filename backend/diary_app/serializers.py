from rest_framework import serializers
from .models import Product, DeliveryLocation, Order

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'image', 'price', 'description', 'available']

class DeliveryLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryLocation
        fields = ['id', 'location', 'price']

class OrderSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField()

    class Meta:
        model = Order
        fields = ['product_id', 'mpesa_name', 'mpesa_code', 'delivery_location', 'delivery_price', 'total']