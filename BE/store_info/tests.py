from django.test import TestCase
from .models import Store
from .views import StoreListAPIView
# Create your tests here.

# tests/test_views.py
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from store_info.models import Store

