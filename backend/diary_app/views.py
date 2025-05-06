from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product, DeliveryLocation, Order
from .serializers import ProductSerializer, DeliveryLocationSerializer, OrderSerializer
from twilio.rest import Client
from django.conf import settings

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.filter(available=True)
    serializer_class = ProductSerializer

class DeliveryLocationViewSet(viewsets.ModelViewSet):
    queryset = DeliveryLocation.objects.all()
    serializer_class = DeliveryLocationSerializer

@api_view(['POST'])
def create_order(request):
    serializer = OrderSerializer(data=request.data)
    if serializer.is_valid():
        product = Product.objects.get(id=serializer.validated_data['product_id'])
        delivery_price = serializer.validated_data['delivery_price'] or 0
        total = product.price + delivery_price
        order = Order.objects.create(
            product=product,
            mpesa_name=serializer.validated_data['mpesa_name'],
            mpesa_code=serializer.validated_data['mpesa_code'],
            delivery_location=serializer.validated_data['delivery_location'],
            delivery_price=delivery_price,
            total=total
        )
        # Send WhatsApp message
        client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
        message_body = (
            f"New Order:\n"
            f"Product: {product.name}\n"
            f"MPESA Name: {order.mpesa_name}\n"
            f"MPESA Code: {order.mpesa_code}\n"
            f"Delivery Location: {order.delivery_location or 'TBD'}\n"
            f"Delivery Price: {order.delivery_price or 'TBD'}\n"
            f"Total: {order.total}"
        )
        client.messages.create(
            body=message_body,
            from_=settings.TWILIO_WHATSAPP_NUMBER,
            to=settings.SELLER_WHATSAPP
        )
        return Response({'message': 'Order created successfully'})
    return Response(serializer.errors, status=400)