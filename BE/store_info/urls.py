from django.urls import path
from store_info.views import StoreListAPIView, CategoryListAPIView, StampListView, ActiveStampListView, ActiveStampUpdateAPIView

app_name = 'store_info'

urlpatterns = [
    path('active_stamps/', ActiveStampListView.as_view(), name='active-stamp-list'),
    path('category_list/<str:category>/', CategoryListAPIView.as_view(), name='category_list'),
    path('stamps/activate/<str:store_name>/', ActiveStampUpdateAPIView.as_view(), name='activate-stamp'),
    path('stamps/<str:name>/', StampListView.as_view(), name='stamp-list'),
    path('<str:name>/', StoreListAPIView.as_view(), name='store_list'),
]