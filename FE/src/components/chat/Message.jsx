import React from "react";
import styled from "styled-components";
import firstBotBubbleBackground from "../../assets/papertexture.png";
import firstCharacterImage from "../../assets/tourGuide2.png";
import subsequentCharacterImage from "../../assets/tourGuide1.png";

const Message = ({ message, isFirstMessage }) => {
  return (
    <MessageContainer isUser={message.isUser}>
      <H>
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
        {message.content}
      </H>
    </MessageContainer>
  );
};

const MessageContainer = styled.div`
  display: flex;
  justify-content: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  margin-bottom: ${(props) => (props.isUser ? "50px" : "40px")};
  width: 100%;
`;

const MessageBubble = styled.div`
  width: ${(props) => (!props.isUser && props.isFirstMessage ? "auto" : "91%")};
  padding: ${(props) => (props.isFirstMessage ? "8px" : "20px")};
  padding-left: ${(props) => (props.isFirstMessage ? "90px" : "15px")};
  padding-right: ${(props) => (props.isUser ? "0px" : "1rem")};

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
  font-size: 0.83rem;
  line-height: 1.2;
  white-space: pre-wrap;
  position: relative;
`;

const CharacterImage = styled.img`
  position: absolute;
  top: ${(props) => (props.isFirstMessage ? "-30px" : "-38px")};
  left: ${(props) => (props.isFirstMessage ? "-40px" : "-10px")};
  width: ${(props) => (props.isFirstMessage ? "120px" : "55px")};
  height: ${(props) => (props.isFirstMessage ? "110px" : "50px")};
  z-index: 2;
`;

const MessageText = styled.div`
  position: relative;
  z-index: 1;
  margin-left: ${(props) => (props.isFirstMessage ? "-25px" : "-5px")};
`;
const H = styled.div`
  display: flex;
  flex-direction: column;
`;
export default Message;
