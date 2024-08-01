from rest_framework.generics import ListAPIView, UpdateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Store, Stamp
from .serializers import StoreSerializer, StampSerializer



# Create your views here.
class StoreListAPIView(ListAPIView):
    serializer_class = StoreSerializer

    def get_queryset(self):
        name = self.kwargs['name']
        print(f"StoreListAPIView - name 값: {name}")
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

class StampListView(ListAPIView):
    """
    매장 이름으로 스탬프 정보를 조회하는 API
    """
    serializer_class = StampSerializer

    def get_queryset(self):
        # 기본 쿼리셋을 모두 가져옵니다
        queryset = Stamp.objects.all()
        
        # URL 쿼리 파라미터에서 'name' 값을 가져옵니다
        # store_name = self.request.query_params.get('name', None)
        store_name = self.kwargs['name']
        
        if store_name:
            try:
                # Store 모델에서 매장 이름으로 Store 객체를 조회합니다
                store = Store.objects.get(name=store_name)
                
                # 해당 Store 객체와 연결된 Stamp 객체들을 필터링합니다
                queryset = queryset.filter(name=store)
            except Store.DoesNotExist:
                # Store 객체가 존재하지 않을 경우 빈 쿼리셋을 반환합니다
                queryset = queryset.none()
        
        return queryset

    def get(self, request, *args, **kwargs):
        store_name = self.kwargs['name']
        print("Requested store name: ", store_name)  # 디버깅용 출력

        queryset = self.get_queryset()
        if queryset.exists():
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

class ActiveStampListView(ListAPIView):
    """
    활성화된 스탬프 정보를 조회하는 API
    """
    serializer_class = StampSerializer

    def get_queryset(self):
        print("Fetching active stamps")
        active_stamps = Stamp.objects.filter(is_active=True)
        print(f"Active stamps: {active_stamps}")
        return active_stamps

class ActiveStampUpdateAPIView(UpdateAPIView):
    """
    Store name에 해당하는 Stamp 활성화 API
    """
    serializer_class = StampSerializer

    def get_queryset(self):
        store_name = self.kwargs['store_name']
        return Stamp.objects.filter(name__name=store_name)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        queryset = self.get_queryset()
        instance = queryset.first()  # 특정 스토어의 첫 번째 스탬프를 활성화
        if instance is None:
            return Response({'detail': 'Stamp not found.'}, status=status.HTTP_404_NOT_FOUND)
        instance.is_active = True  # 활성화
        instance.save()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)