import MarketMap from "../components/MainPage/marketInfo/MarketMap";
import styled from "styled-components";

const MarketDetail = () => {
  //사진
  return (
    <>
      <DetailContainer>
        <Title>점포명</Title>
        <div>전화</div>
      </DetailContainer>
      <div>취급 품목 구분 (음식 종류 기준)</div>
      <ReviewBtn>네이버리뷰 요약</ReviewBtn>
      <div>메뉴</div>
      <div> 위치</div>
      <MarketMap />
    </>
  );
};

export default MarketDetail;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;
const ReviewBtn = styled.div`
  background-color: none;
`;
const DetailContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
