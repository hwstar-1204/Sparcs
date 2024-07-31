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
          /* 사용자 질의문 */
          tokenStream: false /* stream 출력 x */,
          requestOverride: {
            /* OpenAPI 인증키  */
            baseOperation: {
              header: {
                "X-Naver-Client-Id": "QdTH6RmiC3gXDz03tzBs",
                "X-Naver-Client-Secret": "YF3soMinxm",
              },
            },
          },
        })

        .then((res) => {
          const data = JSON.parse(res.data);
          console.log(data.answer);
          addMessage({ text: data.answer, isUser: false });
        })

        /*"summary": "광장시장은 서울 종로구 예지동에 위치한 오랜 전통을 가진 재래시장입니다.",
  "answer": "광장시장은 서울특별시 종로구 예지동에 있는 재래시장으로, 오랜 전통을 가진 시장입니다. 조선 후기에는 이현 또는 배오개 장시 라 불렸으며, 1905년 광장주식회사의 설립과 함께 시장 개설 허가를 받아 현재까지 이어져 오고 있습니다. 다양한 먹을거리를 파는 음식점들이 많고, 포목과 구제 등의 의류를 판매하는 것으로 유명합니다.",
  "tips": "광장시장은 지하철 1호선 종로5가역 8번 출구, 지하철 2호선, 5호선 을지로4가역 4번 출구를 이용하여 방문하실 수 있습니다. 시장의 운영 시간은 점포마다 다르지만, 일반적으로 오전 9시부터 오후 6시까지 운영됩니다."
*/
        .catch((err) => {
          console.log(err);
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
