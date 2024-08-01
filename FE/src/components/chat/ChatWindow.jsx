import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Message from "./Message";

const ChatWindow = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <ChatWindowContainer>
      {messages.map((message, index) => (
        <Message key={index} message={message} isFirstMessage={index === 0} />
      ))}
      <div ref={messagesEndRef} />
    </ChatWindowContainer>
  );
};

const ChatWindowContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;

  /* 스크롤바 스타일링 (선택사항) */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export default ChatWindow;
