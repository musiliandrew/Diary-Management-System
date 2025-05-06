from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'products', views.ProductViewSet)
router.register(r'delivery-locations', views.DeliveryLocationViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('order/', views.create_order, name='create_order'),
]