import requests
import json

class SkillSetFinalAnswerExecutor:
    def __init__(self, host, api_key, api_key_primary_val, request_id):
        self._host = host
        self._api_key = api_key
        self._api_key_primary_val = api_key_primary_val
        self._request_id = request_id

    def execute(self, skill_set_cot_request):
        headers = {
            'X-NCP-CLOVASTUDIO-API-KEY': self._api_key,
            'X-NCP-APIGW-API-KEY': self._api_key_primary_val,
            'X-NCP-CLOVASTUDIO-REQUEST-ID': self._request_id,
            'Content-Type': 'application/json; charset=utf-8',
            # 'Accept': 'text/event-stream',
        }

        response_lines = []
        with requests.post(self._host + '/testapp/v1/skillsets/czfk1pco/versions/11/final-answer',
                           headers=headers, json=skill_set_cot_request, stream=True) as r:
            for line in r.iter_lines():
                if line:
                    response_lines.append(line.decode("utf-8"))
        return response_lines