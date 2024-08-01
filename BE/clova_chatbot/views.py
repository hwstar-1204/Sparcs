from django.shortcuts import render
from django.views import View
from django.http import JsonResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils import SkillSetFinalAnswerExecutor
import json

class SkillSetView(APIView):
    def post(self, request):
        request_data = request.data
        try:
            final_answer_executor = SkillSetFinalAnswerExecutor(
                host='https://clovastudio.stream.ntruss.com',
                api_key='NTA0MjU2MWZlZTcxNDJiY5+eVxFXCD1c4jQlwrzXLwv7h6m/NWOwbTALp4W4hZXJ',
                api_key_primary_val='Wf9MV2jCCC2u2bSoe2T6LV8WEDpeWUN6mlisoVq7',
                request_id='65ffef29-87ad-4cec-88bb-4c4fb1617977'
            )

            response_lines = final_answer_executor.execute(request_data)

            json_data = json.loads(response_lines[0])
            final_reulst = json_data['result']['finalAnswer']

            print(final_reulst)

            return Response(final_reulst, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


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
        print(response.encode('utf-8'))
        return JsonResponse({'response': response})