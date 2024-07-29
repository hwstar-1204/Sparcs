import styled from "styled-components";
import { MdArrowForwardIos } from "react-icons/md";

const CategoryItem = () => {
  return (
    <CategoryItemList>
      <ImgWrapper>
        <MarketImg>hi</MarketImg>
      </ImgWrapper>
      <DetailContainer>
        <MarketName>{}</MarketName>
        <Classfication>
          <div></div>
        </Classfication>
        <Location>{}</Location>
      </DetailContainer>
      <ChatBotBtn>
        <MdArrowForwardIos color="#707070" />
      </ChatBotBtn>
    </CategoryItemList>
  );
};

export default CategoryItem;
const ImgWrapper = styled.div`
  font-size: 0.875rem;
  font-weight: bold;
  margin-right: 1.125rem;
  margin-left: 1.0625rem;
`;
const MarketImg = styled.div``;
const MarketName = styled.div`
  font-size: 0.875rem;
  font-weight: bold;
  margin-bottom: 0.375rem;
`;
const Classfication = styled.div`
  background-color: #cfcfcf;
  width: 1.0625rem;
  height: 1.0625rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.375rem;

  div {
    font-size: 0.625rem;
    font-weight: bold;
  }
`;
const CategoryItemList = styled.div`
  display: flex;
  align-items: center;
  height: 6.125rem;
  border-top-right-radius: 0.625rem;
  border-top-left-radius: 0.625rem;
  border-bottom: solid 1px #00000041;
`;
const Location = styled.div`
  display: flex;
  font-size: 0.5rem;
`;
const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const ChatBotBtn = styled.div`
  position: absolute;

  left: 345px;
`;
