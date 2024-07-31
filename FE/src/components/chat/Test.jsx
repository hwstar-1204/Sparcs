import React, { useState } from "react";
import axios from "axios";

const Test = () => {
  const [response, setResponse] = useState("");

  const execute = async () => {
    const host = "https://clovastudio.stream.ntruss.com";
    const apiKey =
      "NTA0MjU2MWZlZTcxNDJiY5+eVxFXCD1c4jQlwrzXLwv7h6m/NWOwbTALp4W4hZXJ";
    const apiKeyPrimaryVal = "Wf9MV2jCCC2u2bSoe2T6LV8WEDpeWUN6mlisoVq7";
    const requestId = "a7393f64-e277-4cb6-b3cb-2a266266dc4c";

    const headers = {
      "X-NCP-CLOVASTUDIO-API-KEY": apiKey,
      "X-NCP-APIGW-API-KEY": apiKeyPrimaryVal,
      "X-NCP-CLOVASTUDIO-REQUEST-ID": requestId,
      "Content-Type": "application/json; charset=utf-8",
      Accept: "text/event-stream",
    };

    const requestData = {
      query:
        "나는 분식을 선호한다. 간단한 간식 목적이다. 점심에 먹을것이다. 3-4인 방문한다. 광장시장 안에 있는 음식점을 추천해줘",
      tokenStream: "False",
    };

    try {
      const response = await axios.post(
        `${host}/testapp/v1/skillsets/czfk1pco/versions/10/final-answer`,
        requestData,
        { headers, responseType: "JSON" }
      );

      // let fullResponse = "";
      // for await (const chunk of response.data) {
      //   fullResponse += chunk.toString();
      //   setResponse((prevResponse) => prevResponse + chunk.toString());
      // }

      console.log(fullResponse);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <button onClick={execute}>Execute Request</button>
      <pre>{response}</pre>
    </div>
  );
};

export default Test;
