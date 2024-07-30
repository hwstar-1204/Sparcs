import React from "react";
import styled from "styled-components";
import firstBotBubbleBackground from "../../assets/papertexture.png";
import firstCharacterImage from "../../assets/tourGuide2.png";
import subsequentCharacterImage from "../../assets/tourGuide1.png";

const Message = ({ message, isFirstMessage }) => {
  return (
    <MessageContainer isUser={message.isUser}>
      <MessageBubble isUser={message.isUser} isFirstMessage={isFirstMessage}>
        {!message.isUser && (
          <CharacterImage
            src={
              isFirstMessage ? firstCharacterImage : subsequentCharacterImage
            }
            alt="Character"
            isFirstMessage={isFirstMessage}
          />
        )}
        <MessageText isFirstMessage={isFirstMessage}>
          {message.text}
        </MessageText>
      </MessageBubble>
    </MessageContainer>
  );
};

const MessageContainer = styled.div`
  display: flex;
  justify-content: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  margin-bottom: ${(props) => (props.isUser ? "50px" : "15px")};
  width: 100%;
`;

const MessageBubble = styled.div`
  width: ${(props) => (props.isUser ? "auto" : "100%")};

  padding: ${(props) => (props.isUser ? "8px" : "12px")};
  padding-left: ${(props) => (props.isFirstMessage ? "90px" : "15px")};

  border-radius: 20px;
  background-color: ${(props) => (props.isUser ? "#FFD58C" : "transparent")};
  background-image: ${(props) =>
    props.isUser
      ? "none"
      : props.isFirstMessage
      ? `url(${firstBotBubbleBackground})`
      : `url(${firstBotBubbleBackground})`};
  background-size: cover;
  background-position: center;
  color: black;
  word-wrap: break-word;
  font-size: 0.8rem;
  line-height: 1.2;
  white-space: pre-wrap;
  position: relative;
`;

const CharacterImage = styled.img`
  position: absolute;
  top: ${(props) => (props.isFirstMessage ? "-30px" : "-52px")};
  left: ${(props) => (props.isFirstMessage ? "-40px" : "-10px")};
  width: ${(props) => (props.isFirstMessage ? "120px" : "65px")};
  height: ${(props) => (props.isFirstMessage ? "110px" : "60px")};
  z-index: 2;
`;

const MessageText = styled.div`
  position: relative;
  z-index: 1;
  margin-left: ${(props) => (props.isFirstMessage ? "-25px" : "-5px")};
`;

export default Message;
