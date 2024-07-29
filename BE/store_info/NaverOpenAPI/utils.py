import json
import os, re


def save_json(data, file_path):
    with open(file_path, 'w', encoding='utf-8') as outfile:
        json.dump(data, outfile, ensure_ascii=False, indent=4)


# def load_json(file_path):
#     with open(file_path, 'r', encoding='utf-8') as json_file:
#         json_data = json_file.read()
#         dict_data = json.loads(json_data)
#         return dict_data

def load_json(file_path):
    with open(file_path, 'r', encoding='utf-8') as json_file:
        data = json.loads(json_file)
        return data


def get_data_from_json(file_path):
    titles, links = [], []
    json_data = load_json(file_path)

    print(json_data)

    for item in json_data['items']:
        title = re.sub(r'<.+?>', '', item['title'])  # 전처리 - 태그 제거
        titles.append(title)
        links.append(item['link'])

    return titles, links


# 디렉토리 생성 함수
def ensure_dir_exists(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)


# 파일 이름을 안전하게 변환하는 함수
def sanitize_filename(filename):
    # 파일 이름에 유효하지 않은 문자 제거
    return re.sub(r'[<>:"/\\|?*]', '', filename)


# txt 파일에서 데이터 읽어오기
def clean_html_tags(data):
    return re.sub(r'<br\s*/?>|<b\s*/?>|</b>', ' ', data)
    # with open(file_path, 'r', encoding='utf-8') as file:
    #     data = file.read()

    # <br> 태그를 ''로 대체
    # data = re.sub(r'<br\s*/?>|<b\s*/?>|</b>', ' ', data)
    # data를 다시 저장
    # with open(file_path, 'w', encoding='utf-8') as file:
    #     file.write(data)
