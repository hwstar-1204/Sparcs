import Modal from "react-modal";
import "./MarkInfo.css";
import styled from "styled-components";
import { MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const TargetInfo = ({ isOpen, onRequestClose, markerData }) => {
  const nav = useNavigate();
  const handleChat = () => {
    nav(`/chat/${encodeURIComponent(markerData.title)}`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="markModal"
      overlayClassName="markOverlay"
    >
      <MarketDetail>
        {markerData && (
          <ContentWrapper>
            <MarketImg>
              {markerData.img && (
                <img src={markerData.img} alt={markerData.title} />
              )}
            </MarketImg>
            <MarketInfo>
              <h2>{markerData.title}</h2>
              <button>{markerData.category}</button>
              <p>{markerData.address}</p>
            </MarketInfo>

            <MdArrowForwardIos onClick={handleChat} />
          </ContentWrapper>
        )}
      </MarketDetail>
    </Modal>
  );
};

export default TargetInfo;

const MarketDetail = styled.div`
  padding-left: 0.5rem;
  height: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

const MarketImg = styled.div`
  margin-right: 1.5rem;
  img {
    width: 108px;
    height: 108px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const MarketInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 0.9rem;

  h2 {
    font-size: 18px;
    font-weight: bold;
    margin: 0;
    margin-bottom: 0.7rem;
  }

  button {
    background-color: #f3f4f9;
    color: #414141;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 8px 0 8px;
    width: auto;
    height: 21px;
    border-color: #cfcfcf;
    border-radius: 5px;
    border: none;
    font-size: 11px;
    margin: 0;
    margin-bottom: 0.7rem;
  }

  p {
    font-size: 10px;
    line-height: 15px;
  }
`;
