import styled from "styled-components";
import { useState } from "react";
import MarketCategory from "./category/MarketCategory";
import MarketMap from "./marketInfo/MarketMap";
import { CiGlobe } from "react-icons/ci";
import InfoModal from "./InfoModal";
const MainPageHeader = () => {
  const [selectName, setSelectName] = useState("market info");
  const [infoModalIsOpen, setInfoModalIsOpen] = useState(true);
  return (
    <>
      <HeaderContainer>
        <TranslationBtnWrapper>
          <TranslationBtn>
            <CiGlobe size={"1rem"} strokeWidth={0.5} />
            <div>한국어</div>
          </TranslationBtn>
        </TranslationBtnWrapper>

        <HeaderTitle>광장 시장</HeaderTitle>
        <SelectContainer>
          <SelectBtn
            isSelected={selectName === "market info"}
            onClick={() => setSelectName("market info")}
          >
            <span>가게 안내도</span>
          </SelectBtn>
          <SelectBtn
            isSelected={selectName === "category"}
            onClick={() => setSelectName("category")}
          >
            <span>카테고리</span>
          </SelectBtn>
        </SelectContainer>
      </HeaderContainer>
      {selectName === "category" ? <MarketCategory /> : <MarketMap />}
      <InfoModal
        isOpen={infoModalIsOpen}
        onRequestClose={() => setInfoModalIsOpen(false)}
      />
    </>
  );
};

export default MainPageHeader;

const HeaderContainer = styled.div`
  border: black;
  border-bottom-left-radius: 0.625rem;
  border-bottom-right-radius: 0.625rem;
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.2);
  div {
    font-size: 1.25rem;
    font-weight: bold;
  }
`;
const TranslationBtnWrapper = styled.div`
  position: absolute;
  left: 335px;
  top: 69px;
`;
const TranslationBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: #eef0f8;
  div {
    font-size: 0.5rem;
    margin-top: 0.2rem;
    font-weight: bold;
  }
`;

const HeaderTitle = styled.div`
  display: flex;
  margin-top: 4.204rem;
  justify-content: center;
  margin-bottom: 2.06rem;
`;

const SelectContainer = styled.div`
  display: flex;
  span {
    font-size: 0.875rem;
  }
`;

const SelectBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 2.3rem;
  cursor: pointer;
  position: relative;

  span {
    color: ${(props) => (props.isSelected ? "#566CC7" : "#a0a0a0")};
    transition: color 0.3s ease;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -0.45rem;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #566cc7;
      transform: scaleX(${(props) => (props.isSelected ? 1 : 0)});
      transition: transform 0.3s ease;
    }
  }
`;
