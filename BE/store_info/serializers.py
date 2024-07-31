from rest_framework import serializers
from .models import Store, Stamp

class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = '__all__'

class StampSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stamp
        fields = ['id', 'name', 'image']