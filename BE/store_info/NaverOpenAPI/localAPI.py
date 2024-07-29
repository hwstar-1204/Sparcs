import json
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "BE.settings")

import django

django.setup()
from store_info.NaverOpenAPI.naver_api import NaverLocalAPI
from utils import clean_html_tags
from store_info.models import Store


def local(naver_local_api: NaverLocalAPI, serach_store: str):
    naver_local_api.set_encText(serach_store)  # 검색할 내용
    naver_local_api.set_display_num(1)
    naver_local_api.set_sorted_type("comment")
    data = naver_local_api.run()

    data = json.loads(data)

    # Parse the data
    if data['items'] is None:
        print("No items")
        return

    items = data['items']

    # itmes 데이터를 store model에 저장
    for item in items:
        store = Store()
        store.name = clean_html_tags(item['title']).strip()
        store.category = item['category'].split('>')[0]
        store.address = item['address']
        store.roadAddress = item['roadAddress']
        store.telephone = item['telephone']
        store.link = item['link']
        store.description = item['description']
        store.mapx = item['mapx']
        store.mapy = item['mapy']
        store.save()

    # data = save_json(data, file_path)

    # titles, links = get_data_from_json(file_path)
    # for t, l in zip(titles, links):  # 확인용 출력
    #     print(t, l)


if __name__ == "__main__":
    naver_local_api = NaverLocalAPI()

    # # 블로그 리뷰 경색할 점포 리스트 읽어오기
    search_store_file_path = '/Users/hwstar/Documents/GitHub/Sparcs/BE/store_info/data/search_stores.txt'

    try:
        with open(search_store_file_path, 'r') as file:
            for line in file:
                search_store = line.strip()
                local(naver_local_api, search_store)
    except FileNotFoundError:
        print(f"Error: The file '{search_store_file_path}' does not exist.")
        # 지금까지 저장된 데이터를 모두 삭제
        Store.objects.all().delete()
        exit(1)
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        # 지금까지 저장된 데이터를 모두 삭제
        Store.objects.all().delete()
        exit(1)
