import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { IoIosArrowRoundUp } from "react-icons/io";
import { SlMicrophone } from "react-icons/sl";

const MessageInput = ({ addMessage }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      addMessage({ text: message, isUser: true });

      const apiUrl =
        "https://clovastudio.stream.ntruss.com/v1/skillsets/czfk1pco/versions/10/final-answer";

      const headers = {
        "X-NCP-CLOVASTUDIO-API-KEY":
          "NTA0MjU2MWZlZTcxNDJiY5+eVxFXCD1c4jQlwrzXLwv7h6m/NWOwbTALp4W4hZXJ",
        "X-NCP-APIGW-API-KEY": "Wf9MV2jCCC2u2bSoe2T6LV8WEDpeWUN6mlisoVq7",
        "X-NCP-CLOVASTUDIO-REQUEST-ID": "6e6195f9-7ce6-4b75-b620-136e78a5fc46",
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      };

      const data = {
        query: message,
        chatHistory: [
          {
            role: "user",
            content: message,
          },
        ],
        tokenStream: false,
        requestOverride: {
          baseOperation: {
            header: {},
            query: {},
            requestBody: {},
          },
          operations: [
            {
              operationId: "YOUR_OPERATION_ID",
              header: {},
              query: {},
              requestBody: {},
            },
          ],
        },
      };

      axios
        .post(apiUrl, data, { headers })
        .then((res) => {
          console.log(res);
          // addMessage({ text: res.data.response, isUser: false });
        })
        .catch((err) => {
          console.log(err);
          console.log("hi");
        });

      setMessage("");
    }
  };

  return (
    <InputContainer>
      <InputWrapper>
        <MicrophoneIcon>
          <SlMicrophone size={"1.3rem"} />
        </MicrophoneIcon>
        <ChatMessageInput
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <ChatBtn onClick={handleSendMessage}>
          <IoIosArrowRoundUp size={"1.8rem"} />
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
