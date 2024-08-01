# import os
# import json
# from store_info.NaverOpenAPI.naver_api import NaverBlogAPI
# from store_info.NaverOpenAPI.utils import sanitize_filename, ensure_dir_exists, clean_html_tags, save_json
#
#
# def Blog(naver_api: NaverBlogAPI, search_store: str):
#     naver_api.set_encText(search_store)  # 검색할 내용
#     naver_api.set_display_num(100)
#     naver_api.set_sorted_type("sim")  # date
#     data = naver_api.run()
#
#     data = save_json(data, file_path)  # json으로 저장
#
#     # -------------------------------------------
#
#     with open('/Users/hwstar/Desktop/workspace/RAG/data/crawling_data.json', 'r') as file:
#         data = file.read()
#
#     # 문자열을 파이썬 딕셔너리로 변환
#
#     data_dict = json.loads(data)
#
#     # 딕셔너리를 JSON 파일로 저장
#     with open('/Users/hwstar/Desktop/workspace/RAG/data/crawling_data.json', 'w', encoding='utf-8') as json_file:
#         json.dump(data_dict, json_file, ensure_ascii=False, indent=4)
#
#     parsed_data = json.loads(data_dict)
#     print(parsed_data)
#
#     # Access the parsed data
#     last_build_date = parsed_data['lastBuildDate']
#     total = parsed_data['total']
#     start = parsed_data['start']
#     display = parsed_data['display']
#
#     if parsed_data['items'] is None:
#         print("No items")
#         return
#     items = parsed_data['items']
#
#     descriptions = []
#
#     # Process the items
#     for item in items:
#         title = item['title']
#         link = item['link']
#         description = item['description']
#         blogger_name = item['bloggername']
#         blogger_link = item['bloggerlink']
#         post_date = item['postdate']
#
#         if int(post_date[2:4]) < 20:  # 20년도 이상 데이터
#             continue
#         descriptions.append(description)
#         print(post_date, " => ", description)
#
#         # 파일 이름 생성
#         search_store = sanitize_filename(search_store)  # 특수 문자 제거
#         file_name = os.path.join('../data/real_descriptions', f'{search_store}_descriptions.txt')
#
#         # 디렉토리 확인 및 생성
#         ensure_dir_exists(os.path.dirname(file_name))
#
#         data = ''
#         with open(file_name, 'w') as file:
#             for description in descriptions:
#                 data += description + '\n'
#             data = clean_html_tags(data)
#
#             # file.write(description + '\n')
#             file.write(data)
#
#
#
