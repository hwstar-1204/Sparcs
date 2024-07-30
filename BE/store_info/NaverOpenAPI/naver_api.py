import os
import sys
import urllib.request, urllib.parse
# .env 파일을 활용한 환경변수 가져오기
from dotenv import load_dotenv
load_dotenv()

class NaverBlogAPI:
    sort = ["sim", "date"]

    def __init__(self):
        self.client_id = os.getenv("client_id")  # 환경변수
        self.client_secret = os.getenv("client_secret")
        self.encText = None  # urllib.parse.quote("통인시장 기름 떡볶이")
        self.url = "https://openapi.naver.com/v1/search/blog.json?query="  # JSON 결과
        self.display_num = 2
        self.sorted_type = "sim"

    def __str__(self) -> str:
        return f"Blog API = encText: {self.encText}, url: {self.url}"

    def set_encText(self, input_text) -> None:
        self.encText = urllib.parse.quote(input_text)

    def set_display_num(self, display_num) -> None:
        if display_num < 1 or display_num > 100:
            raise "Error: Wrong display number"

        self.display_num = display_num

    def set_sorted_type(self, sorted_type) -> None:
        if sorted_type not in self.sort:
            raise "Error: Wrong sorted type"

        self.sorted_type = sorted_type

    def run(self) -> str:
        if self.encText is None:
            raise "Error: No input text"

        url = self.url + self.encText + "&display=" + str(self.display_num) + "&sort=" + self.sorted_type

        request = urllib.request.Request(url)
        request.add_header("X-Naver-Client-Id", self.client_id)
        request.add_header("X-Naver-Client-Secret", self.client_secret)
        response = urllib.request.urlopen(request)
        rescode = response.getcode()

        if rescode == 200:
            response_body = response.read()
            print(rescode)
            return response_body.decode('utf-8')
        else:
            print("Error Code:" + rescode)


class NaverLocalAPI:
    sort = ["random", "comment"]  # random: 유사도 순, comment: 카페/블로그 리뷰 순

    def __init__(self):
        self.client_id = os.getenv("client_id")  # 환경변수
        self.client_secret = os.getenv("client_secret")
        self.encText = None  # urllib.parse.quote("검색어")
        self.url = "https://openapi.naver.com/v1/search/local.json?query="  # JSON 결과
        self.display_num = 5
        self.sorted_type = "comment"

    def __str__(self) -> str:
        return f"Local API = encText: {self.encText}, url: {self.url}"

    def set_encText(self, input_text) -> None:
        self.encText = urllib.parse.quote(input_text)

    def set_display_num(self, display_num) -> None:
        if display_num < 1 or display_num > 5:
            print("Error: Wrong display number")
            return
        self.display_num = display_num

    def set_sorted_type(self, sorted_type) -> None:
        if sorted_type not in self.sort:
            print("Error: Wrong sorted type")
            return
        self.sorted_type = sorted_type

    def run(self) -> str:
        if self.encText is None:
            raise ValueError("Error: No encText")  # TypeError가 아닌 ValueError로 변경

        url = self.url + self.encText + "&display=" + str(self.display_num) + "&sort=" + self.sorted_type

        request = urllib.request.Request(url)
        request.add_header("X-Naver-Client-Id", self.client_id)
        request.add_header("X-Naver-Client-Secret", self.client_secret)
        response = urllib.request.urlopen(request)
        rescode = response.getcode()

        if rescode == 200:
            response_body = response.read()
            print(rescode)
            return response_body.decode('utf-8')
        else:
            print("Error Code:" + rescode)