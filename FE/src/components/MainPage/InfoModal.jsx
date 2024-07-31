import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import styled from "styled-components";
import "./InfoModal.css";
import stamp from "../../assets/stamp/스탬프예시.png";

const InfoModal = ({ isOpen, onRequestClose }) => {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        className="modal"
        overlayClassName="overlay"
      >
        <ModalContent>
          <ModalImage src="src/assets/tourGuide1.png" alt="Modal Top Image" />
          <Header>
            <button onClick={onRequestClose}>
              <IoClose size={"1.5rem"} />
            </button>
          </Header>
          <InfoContainer>
            <TextLine>
              안녕하세요, <Bold>타일러</Bold> 님.<br></br> <Bold>광장시장</Bold>
              에 오신 것을 환영해요!<br></br> 저는 오늘 광장시장 안내를 도와드릴
              투어 가이드 '나랑'이에요.<br></br>
            </TextLine>
            <StampContainer>
              <TextLine>
                <div>
                  광장시장 안에 있는 가게의 <Bold>QR을 스캔</Bold>하면<br></br>
                  음식에 대한 자세한 설명과 함께 스탬프를 <br></br>
                  지급해드릴게요.
                </div>
              </TextLine>
              <Stamp src={stamp} alt={"hi"} />
            </StampContainer>
            <TextLine>
              광장시장에서 한국의 특색을 지닌 다양한 음식들을 경험해보세요!
            </TextLine>
          </InfoContainer>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default InfoModal;

const ModalContent = styled.div`
  width: 100%;
  height: 100%;
  background-image: url("src/assets/background.png");
  background-size: cover;
  background-position: center;
  border-radius: 0.625rem;
`;

const ModalImage = styled.img`
  position: absolute;
  top: -135px;
  left: 15%;
  transform: translateX(-50%);
  width: 11.5rem;
  z-index: 1001;
`;
const InfoContainer = styled.div`
  margin: 1rem;
  margin-top: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StampContainer = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 1.5rem;
  padding-bottom: 0;
`;

const Stamp = styled.img`
  width: 17.1rem;
  height: auto;
  margin-left: -15px;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
  button {
    width: 3rem;
    background-color: transparent;
    border: none;
  }
`;

const TextLine = styled.div`
  line-height: 1.5;
  font-size: 0.9rem;
  div {
    font-size: 0.8rem;
  }
`;

const Bold = styled.span`
  font-weight: bold;
`;
