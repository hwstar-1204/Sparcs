import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import styled from "styled-components";
import backgroundImage from "../assets/chatbackground.png";
import welcomeImage from "../assets/chat/p.png";
import ChatWindow from "../components/chat/ChatWindow";
import MessageInput from "../components/chat/MessageInput";
import axios from "axios";

const ChatBot = () => {
  const { marketName } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [storeStamp, setStoreStamp] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);

  const handleSelect = async (option) => {
    setSelectedOption(option);
    let query = "";

    switch (option) {
      case "가게 소개":
        query = `${marketName}의 매장 특징과 매장 분위기, 기타 정보, 영업 시간을 알려줘`;
        break;
      case "대표 인기메뉴":
        query = `${marketName}의 대표인기메뉴와 그 안에 들어가는 주요 재료와 조리방법, 떡볶이의 유래를 알려줘`;
        break;
      case "고객 리뷰":
        query = `${marketName}을 가본적이 있는 사람들의 후기를 알려줘`;
        break;
      case "잘 어울리는 음식":
        query = `${marketName}에서 파는 음식과 잘 어울리는 음식을 알려줘`;
        break;
      case "그 외":
        query = `${marketName}에 대한 다른 부분이 궁금해`;
        break;
      default:
        query = `${marketName} ${option}`;
    }

    setIsWaiting(true);
    addMessage({
      text: "나랑이가 열심히 답변을 생성중입니다. 조금만 기다려 주세요!",
      isUser: false,
      isLoading: true,
    });

    try {
      const response = await axios.post(
        `http://101.79.10.180:8000/clova_chatbot/skillset/`,
        {
          query: query,
          tokenStream: false,
          requestOverride: {
            baseOperation: {
              header: {
                "X-Naver-Client-Id": "QdTH6RmiC3gXDz03tzBs",
                "X-Naver-Client-Secret": "YF3soMinxm",
              },
            },
          },
        }
      );

      const data = JSON.parse(response.data);
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => !msg.isLoading)
      );
      addMessage({ text: data.answer, isUser: false });
    } catch (err) {
      console.log(err);
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => !msg.isLoading)
      );
      addMessage({ text: "죄송합니다. 오류가 발생했습니다.", isUser: false });
    } finally {
      setIsWaiting(false);
    }
  };

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
                  onClick={() => handleSelect("가게 소개")}
                  isSelected={selectedOption === "가게 소개"}
                >
                  <div>가게 소개</div>
                </DetailContent>
                <DetailContent
                  onClick={() => handleSelect("대표 인기메뉴")}
                  isSelected={selectedOption === "대표 인기메뉴"}
                >
                  <div>대표 인기메뉴</div>
                </DetailContent>
                <DetailContent
                  onClick={() => handleSelect("고객 리뷰")}
                  isSelected={selectedOption === "고객 리뷰"}
                >
                  <div>고객 리뷰</div>
                </DetailContent>
                <DetailContent
                  onClick={() => handleSelect("잘 어울리는 음식")}
                  isSelected={selectedOption === "잘 어울리는 음식"}
                >
                  <div>잘 어울리는 음식</div>
                </DetailContent>
                <DetailContent
                  onClick={() => handleSelect("그 외")}
                  isSelected={selectedOption === "그 외"}
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

  const handleSendMessage = async (message) => {
    addMessage({ text: message, isUser: true });
    setIsWaiting(true);
    addMessage({
      text: "나랑이가 열심히 답변을 생성중입니다. 조금만 기다려 주세요!",
      isUser: false,
      isLoading: true,
    });

    try {
      const response = await axios.post(
        `http://101.79.10.180:8000/clova_chatbot/skillset/`,
        {
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
        }
      );

      const data = JSON.parse(response.data);
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => !msg.isLoading)
      );
      addMessage({ text: data.answer, isUser: false });
    } catch (err) {
      console.error(err);
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => !msg.isLoading)
      );
      addMessage({ text: "죄송합니다. 오류가 발생했습니다.", isUser: false });
    } finally {
      setIsWaiting(false);
    }
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
      <MessageInput
        handleSendMessage={handleSendMessage}
        isWaiting={isWaiting}
      />
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
  padding: 8px;
  padding-right: 0;
`;

const WelcomeText = styled.span`
  font-size: 0.83rem;
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
  background-color: ${(props) => (props.isSelected ? "#644119" : "#f3e7db")};
  color: ${(props) => (props.isSelected ? "#FFFFFF" : "#111111")};
  padding: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 110px;
  margin: 2px 0;
  height: 23px;
  border: 1px solid;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  div {
    font-size: 0.6rem;
    font-weight: bold;
  }

  &:hover {
    background-color: #644119;
    color: #ffffff;
  }
`;

export default ChatBot;
