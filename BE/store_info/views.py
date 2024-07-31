from rest_framework.generics import RetrieveAPIView, ListAPIView
from .models import Store
from .serializers import StoreSerializer
from rest_framework import filters

from rest_framework.response import Response
from rest_framework.views import APIView


# Create your views here.
class StoreListAPIView(ListAPIView):
    serializer_class = StoreSerializer

    def get_queryset(self):
        name = self.kwargs['name']
        print(f"name 값: {name}")
        if name is not None:
            # 'name' 필드를 기준으로 필터링
            return Store.objects.filter(name=name)
        # 'name'이 없으면 모든 객체를 반환
        return Store.objects.all()

class CategoryListAPIView(APIView):
    def get(self, request, category, format=None):
        print(f"category 값: {category}")
        if category is not None:
            # 'category' 필드를 기준으로 필터링
            stores = Store.objects.filter(category=category)
        else:
            # 'category'가 없으면 모든 객체를 반환
            stores = Store.objects.all()
        
        serializer = StoreSerializer(stores, many=True)
        return Response(serializer.data)