from django.contrib import admin
from django.urls import path
from clova_chatbot.views import ChatbotView, SkillSetView

app_name = 'clova_chatbot'


urlpatterns = [
    path('test/<str:user_query>/', ChatbotView.as_view(), name='chatbot'),
    path('skillset/', SkillSetView.as_view(), name='skillset'),

]