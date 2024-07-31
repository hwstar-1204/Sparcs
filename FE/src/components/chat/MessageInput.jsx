import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { IoIosArrowRoundUp } from "react-icons/io";
import { SlMicrophone } from "react-icons/sl";

const MessageInput = ({ addMessage }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      addMessage({ text: message, isUser: true });
      axios
        .post(`http://101.79.10.180:8000/clova_chatbot/skillset/`, {
          query: message,
          tokenStream: false,
          requestOverride: {
            baseOperation: {
              header: {
                "X-Naver-Client-Id": "QdTH6RmiC3gXDz03tzBs",
                "X-Naver-Client-Secret": "YF3soMinxm",
              },
            },
          },
        })
        .then((res) => {
          console.log("원본 응답:", res.data);

          // 응답 전체를 문자열로 처리
          const responseText =
            typeof res.data === "string" ? res.data : JSON.stringify(res.data);

          // 'answer' 필드 추출 (있다면)
          const answerMatch = responseText.match(
            /"answer"\s*:\s*"([\s\S]*?)(?:"\s*,|\s*})/
          );
          const answerText = answerMatch
            ? answerMatch[1].replace(/\\"/g, '"').replace(/\\n/g, "\n")
            : "응답을 처리할 수 없습니다.";

          addMessage({ text: answerText, isUser: false });
        })
        .catch((err) => {
          console.error("API 요청 오류:", err);
          addMessage({
            text: "죄송합니다. 서버와 통신 중 오류가 발생했습니다.",
            isUser: false,
          });
        });
      setMessage("");
    }
  };

  return (
    <InputContainer>
      <InputWrapper>
        <MicrophoneIcon>
          <SlMicrophone />
        </MicrophoneIcon>
        <ChatMessageInput
          type="text"
          placeholder="메시지를 입력하세요..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <ChatBtn onClick={handleSendMessage}>
          <IoIosArrowRoundUp size={"1.6rem"} />
        </ChatBtn>
      </InputWrapper>
    </InputContainer>
  );
};

const InputContainer = styled.div`
  padding: 20px;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

const MicrophoneIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
`;

const ChatMessageInput = styled.input`
  height: 3.3rem;
  width: 100%;
  border-radius: 2rem;
  border: none;
  font-size: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 0 3.5rem 0 3rem;
`;

const ChatBtn = styled.button`
  position: absolute;
  right: 0.7rem;
  top: 50%;
  transform: translateY(-50%);
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: #fff4e2;
  border: none;
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 3px 3px 3px rgba(0.1, 0.1, 0.1, 0.1);
`;

export default MessageInput;
