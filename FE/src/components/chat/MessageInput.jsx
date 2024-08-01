import { useState } from "react";
import styled from "styled-components";
import { IoIosArrowRoundUp } from "react-icons/io";
import { SlMicrophone } from "react-icons/sl";

const MessageInput = ({ handleSendMessage, isWaiting }) => {
  const [message, setMessage] = useState("");

  const onSendMessage = () => {
    if (message.trim() !== "" && !isWaiting) {
      handleSendMessage(message);
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
              onSendMessage();
            }
          }}
        />
        <ChatBtn onClick={onSendMessage}>
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
