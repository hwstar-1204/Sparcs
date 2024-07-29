from rest_framework.generics import RetrieveAPIView, ListAPIView
from .models import Store
from .serializers import StoreSerializer

# Create your views here.
class StoreListAPIView(ListAPIView):
    serializer_class = StoreSerializer

    def get_queryset(self):
        """
        URL 파라미터에서 'name' 값을 받아서 필터링된 QuerySet을 반환합니다.
        """
        name = self.request.query_params.get('name', None)
        if name is not None:
            # 'name' 필드를 기준으로 필터링
            return Store.objects.filter(name=name)
        # 'name'이 없으면 모든 객체를 반환
        return Store.objects.all()

class CategoryListAPIView(ListAPIView):
    serializer_class = StoreSerializer

    def get_queryset(self):
        """
        URL 파라미터에서 'category' 값을 받아서 필터링된 QuerySet을 반환합니다.
        """
        category = self.request.query_params.get('category', None)
        if category is not None:
            # 'category' 필드를 기준으로 필터링
            return Store.objects.filter(category=category)
        # 'category'가 없으면 모든 객체를 반환
        return Store.objects.all()