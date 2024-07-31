import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoMdArrowDropright } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import styled from "styled-components";
import backgroundImage from "../assets/chatbackground.png";
import welcomeImage from "../assets/chat/p.png";
import ChatWindow from "../components/chat/ChatWindow";
import MessageInput from "../components/chat/MessageInput";
const ChatBot = () => {
  const { marketName } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [storeStamp, setStoreStamp] = useState(null);
  const [selectMessage, setSelectMessage] = useState("");

  useEffect(() => {
    const importStamp = async () => {
      try {
        const stampModule = await import(
          `../assets/stamp/${decodeURIComponent(marketName)}.png`
        );
        setStoreStamp(stampModule.default);
      } catch (error) {
        console.error("Failed to load stamp image:", error);
        setStoreStamp(null);
      }
    };
    importStamp();
  }, [marketName]);

  useEffect(() => {
    console.log(marketName);
    setMessages([
      {
        text: (
          <WelcomeMessage>
            <WelcomeText>
              안녕하세요, 타일러님!
              <br />
              <br />
              광장시장 {decodeURIComponent(marketName)}
              가게에 <br /> 찾아 오신 것을 환영해요 😃 <br /> <br />
              {decodeURIComponent(marketName)} 스탬프를 수집하신 것을
              축하드려요!
              <br /> 아래 항목들 중 궁금한 부분을 클릭하시면 가게에
              <br />
              대한 정보를 들을 수 있어요.
            </WelcomeText>
          </WelcomeMessage>
        ),
        content: (
          <WelcomeImageContainer>
            <WelcomeImageBackground src={welcomeImage} alt="Welcome" />
            <Container>
              <Stamp>
                {storeStamp && (
                  <WelcomeStamps
                    src={storeStamp}
                    alt={`${decodeURIComponent(marketName)} Stamp`}
                  />
                )}
              </Stamp>
              <Detail>
                <DetailContent
                  onClick={() => setSelectMessage("가게 소개해줘")}
                >
                  <div>가게 소개</div>
                </DetailContent>
                <DetailContent
                  onClick={() => setSelectMessage("대표 인기메뉴가 뭐야?")}
                >
                  <div>대표 인기메뉴</div>
                </DetailContent>
                <DetailContent
                  onClick={() => setSelectMessage("고객 리뷰 보여줘")}
                >
                  <div>고객 리뷰</div>
                </DetailContent>
                <DetailContent
                  onClick={() => setSelectMessage("잘 어울리는 음식은 뭐야?")}
                >
                  <div>잘 어울리는 음식</div>
                </DetailContent>
                <DetailContent
                  onClick={() => setSelectMessage("그 외 것들을 질문할래")}
                >
                  <div>그 외</div>
                </DetailContent>
              </Detail>
            </Container>
          </WelcomeImageContainer>
        ),
        isUser: false,
      },
    ]);
  }, [marketName, storeStamp]);

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
    font-size: 22px;
    font-weight: 600;
    line-height: 4;
  }
  div {
    font-size: 12px;
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

const WelcomeMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: -20px;
  margin-top: 7px;
  padding: 5px;
`;

const WelcomeText = styled.span`
  font-size: 0.9rem;
  margin-bottom: 10px;
`;

const WelcomeImageContainer = styled.div`
  position: relative;
  width: 102%;
  margin-top: 10px;
`;

const WelcomeImageBackground = styled.img`
  width: 100%;
  height: auto;
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const Stamp = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WelcomeStamps = styled.img`
  width: 12rem;
  margin-left: 0.8rem;
  height: auto;
`;

const Detail = styled.div`
  width: 55%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 3.5rem;
`;

const DetailContent = styled.button`
  background-color: #f3e7db;
  border-color: #644119;
  color: #111111;
  padding: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 110px;
  margin: 2px 0;
  height: 23px;
  border: 1.5px solid;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  div {
    font-size: 0.6rem;
    font-weight: bold;
  }
`;

export default ChatBot;
