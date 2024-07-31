import styled from "styled-components";
import { MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const CategoryItem = ({ title, category, address }) => {
  const nav = useNavigate();
  const handleChatBot = () => {
    nav(`/chat/${encodeURIComponent(title)}`);
  };
  CategoryItem.propTypes = {
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  };
  return (
    <CategoryItemList>
      <ImgWrapper>
        <MarketImg></MarketImg>
      </ImgWrapper>
      <DetailContainer>
        <MarketName>{title}</MarketName>
        <Classfication>
          <div>{category}</div>
        </Classfication>
        <Location>{address}</Location>
      </DetailContainer>
      <ChatBotBtn onClick={handleChatBot}>
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
  font-size: 0.95rem;
  font-weight: bold;
  margin-bottom: 0.375rem;
`;
const Classfication = styled.button`
  background-color: #f3f4f9;
  border: 0.5px solid #cfcfcf;
  width: fit-content;
  height: 1.2rem;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.375rem;
  padding: 0 0.3rem;

  div {
    font-size: 0.625rem;
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
  font-size: 0.6rem;
`;
const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1rem;
`;
const ChatBotBtn = styled.div`
  position: absolute;
  right: 1rem;
  margin-right: 1.5rem;
  cursor: pointer;
`;
