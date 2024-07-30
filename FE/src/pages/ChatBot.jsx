import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoMdArrowDropright } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import styled from "styled-components";
import backgroundImage from "../assets/chatbackground.png";
import ChatWindow from "../components/chat/ChatWindow";
import MessageInput from "../components/chat/MessageInput";

const ChatBot = () => {
  const { marketName } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        text: (
          <>
            안녕하세요, 타일러님!
            <br />
            <br />
            광장시장 {decodeURIComponent(marketName)}
            가게에 <br /> 찾아 오신 것을 환영해요 😃
          </>
        ),
        isUser: false,
      },
    ]);
  }, [marketName]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const addMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <ChatContainer>
      <HeaderBar>
        <BackIcon onClick={handleBackClick}>
          <IoIosArrowBack size={"1.5rem"} color="#707070" />
        </BackIcon>
        <h1>{decodeURIComponent(marketName)}</h1>
        <div>
          <IoMdArrowDropright />
          호복이는 광장시장 먹거리의 스토리를 전하는 우리말 지킴이에요.
          <br /> 음식에 관련된 것이라면 무엇이든 물어보세요.
        </div>
      </HeaderBar>
      <ChatWindow messages={messages} />
      <MessageInput addMessage={addMessage} />
    </ChatContainer>
  );
};

const ChatContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
`;

const HeaderBar = styled.div`
  position: relative;
  height: 169px;
  background-color: #fff4e2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  h1 {
    font-size: 18px;
    font-weight: bold;
    line-height: 4;
  }
  div {
    font-size: 11px;
    line-height: 1.5;
    display: flex;
    justify-content: center;
  }
`;

const BackIcon = styled.div`
  position: absolute;
  top: 20px;
  left: 18px;
  cursor: pointer;
`;

export default ChatBot;
