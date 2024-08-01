import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import NavigationBar from "../components/common/NavigationBar";
import { MdIosShare } from "react-icons/md";

const MyScanMarket = () => {
  const [stamps, setStamps] = useState([]);

  useEffect(() => {
    fetchStamps();
  }, []);

  const fetchStamps = async () => {
    try {
      const response = await axios.get(
        "http://101.79.10.180:8000/store_info/active_stamps/"
      );
      setStamps(response.data);
    } catch (error) {
      console.error("Error fetching stamps:", error);
    }
  };

  return (
    <Layout>
      <Content>
        <HeaderContainer>
          <HeaderContent>
            <HeaderTitle>스탬프 북</HeaderTitle>
            <Total>
              <div>타일러 님은 오늘 아래의 스탬프들을 모았어요.</div>
              <Btn>
                <MdIosShare size={"1.4rem"} color="#767474" />
              </Btn>
            </Total>
          </HeaderContent>
        </HeaderContainer>

        <MyScanMarketContainer>
          <StampGrid>
            {stamps.map((stamp, index) => (
              <StampItem key={index}>
                <StampImage
                  src={stamp.image.replace(/"/g, "")}
                  alt={stamp.name}
                />
              </StampItem>
            ))}
          </StampGrid>
        </MyScanMarketContainer>
      </Content>
      <NavigationBar />
    </Layout>
  );
};

export default MyScanMarket;

const Layout = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("src/assets/스탬프북.png");
    background-size: cover;
    background-position: center;
    z-index: -1;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  overflow-y: auto;
`;

const HeaderContainer = styled.div`
  position: relative;
  border: black;
  border-bottom-left-radius: 0.625rem;
  border-bottom-right-radius: 0.625rem;
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.2);
  height: 170px;
  margin-top: -0px;
  z-index: 1000;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderContent = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MyScanMarketContainer = styled.div`
  height: calc(100% - 70px);
  overflow-y: auto;
`;

const StampGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const StampItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const StampImage = styled.img`
  width: 190px;
  height: auto;
  object-fit: cover;
`;

const HeaderTitle = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Total = styled.div`
  position: relative;
  display: flex;
  margin-top: 1rem;
  justify-content: flex-start;
  align-items: center;
  width: 358px;
  height: 48px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  background-color: #f3f4f9;
  div {
    margin-left: 1rem;
    font-size: 0.8rem;
  }
`;

const Btn = styled.div`
  position: absolute;
  top: 0;
  left: 290px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
`;
