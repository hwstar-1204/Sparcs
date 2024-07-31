from django.contrib import admin
from django.urls import path
from store_info.views import StoreListAPIView, CategoryListAPIView

app_name = 'store_info'


urlpatterns = [
    path('<str:name>/', StoreListAPIView.as_view(), name='store_list'),
    path('category_list/<str:category>/', CategoryListAPIView.as_view(), name='category_list'),
    # path('stamp/')
]