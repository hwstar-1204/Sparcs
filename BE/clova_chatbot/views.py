from django.shortcuts import render
from django.views import View
from django.http import JsonResponse


class chatbot:
    def __init__(self):
        self.message = ""
        self.response = ""

    def set_message(self, message):
        self.message = message

    def get_response(self):
        return self.response

    def run(self):
        if self.message == "안녕":
            self.response = "안녕하세요!"
        elif self.message == "가게 소개해줘":
            self.response = "저희 가게는 떡볶이 전문점입니다. \n 광장시장 안에 위치해있어요. \n 매콤하고 달콤한 떡볶이를 즐기세요!"
        elif self.message == "대표메뉴 추천해줘":
            self.response = "저희 가게의 대표메뉴는 떡볶이입니다.\n 매콤하고 달콤한 맛이 일품이에요."
        else:
            self.response = "무슨 말인지 모르겠어요."

        return self.response

class ChatbotView(View):

    def get(self, request, user_query):
        bot = chatbot()
        bot.set_message(user_query)
        response = bot.run()
        # response = response.encode('utf-8')
        return JsonResponse({'response': response})