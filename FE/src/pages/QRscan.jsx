import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/common/NavigationBar";
import { CiGlobe } from "react-icons/ci";
import Html5QrcodePlugin from "../components/qrscan/Html5QrcodeScannerPlugin";

const QRscan = () => {
  const [scannedResult, setScannedResult] = useState("");
  const [scanError, setScanError] = useState("");
  const [isScanning, setIsScanning] = useState(true);
  const navigate = useNavigate();

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const onNewScanResult = useCallback((decodedText, decodedResult) => {
    console.log("스캔된 QR 코드:", decodedText);
    console.log("전체 결과:", decodedResult);

    if (isValidUrl(decodedText)) {
      setScannedResult(decodedText);
      setScanError("");
      setIsScanning(false);

      // HTTPS 프로토콜이 없는 경우 추가
      const url = decodedText.startsWith("http")
        ? decodedText
        : `https://${decodedText}`;

      // 스캔된 URL로 이동
      window.location.href = url;
    } else {
      console.log("유효하지 않은 URL 또는 텍스트입니다.");
      setScannedResult("유효하지 않은 QR 코드 내용");
      setScanError("유효하지 않은 QR 코드입니다. 다시 시도해주세요.");
      setTimeout(() => setScanError(""), 3000);
    }
  }, []);

  const onScanError = useCallback((errorMessage) => {
    if (errorMessage.includes("NotFoundException")) {
      return;
    }
    console.error("QR 코드 스캔 에러:", errorMessage);
    setScanError("QR 코드를 인식하지 못했습니다. 다시 시도해주세요.");
    setScannedResult("");
    setTimeout(() => setScanError(""), 1000);
  }, []);

  const handleRetry = useCallback(() => {
    setIsScanning(true);
    setScannedResult("");
    setScanError("");
  }, []);

  return (
    <Container>
      <Header>
        <TranslationBtnWrapper>
          <TranslationBtn>
            <CiGlobe size={"1rem"} strokeWidth={0.5} />
            <div>한국어</div>
          </TranslationBtn>
        </TranslationBtnWrapper>
        <div>가게에 부착된 QR코드를 스캔해주세요.</div>
      </Header>
      {isScanning && (
        <QRScannerWrapper>
          <Html5QrcodePlugin
            fps={10}
            qrbox={{ width: 250, height: 250 }}
            disableFlip={false}
            qrCodeSuccessCallback={onNewScanResult}
            qrCodeErrorCallback={onScanError}
            width="390px"
            height="295px"
          />
        </QRScannerWrapper>
      )}

      <QrInfoBox>
        <ModalImage src="src/assets/qrInfoImg.png" alt="Modal Top Image" />
        <TextLine>
          <BlueText>QR이 인식</BlueText>되면 호복이와의{" "}
          <BlueText>대화가 생성</BlueText>됩니다. <br />
          가게나 메뉴에 대해서 궁금한 점이 있다면 <br />
          호복이에게 무엇이든 물어보세요.
        </TextLine>
      </QrInfoBox>
      <NavigationBar />
    </Container>
  );
};

export default QRscan;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 7.375rem;
  border-radius: 0.625rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;

  div {
    margin-top: 2rem;
    font-weight: bold;
  }
`;

const TranslationBtnWrapper = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
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
  cursor: pointer;

  div {
    font-size: 0.5rem;
    margin-top: 0.2rem;
    font-weight: bold;
  }
`;

const QRScannerWrapper = styled.div`
  width: 390px;
  height: 390px;
  overflow: hidden;
  border-radius: 10px;
`;

const QrInfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 15rem;
  left: 50%;
  transform: translateX(-50%);
  width: 22.125rem;
  height: 5.75rem;
  background-color: #f3f4f9;
  border-radius: 0.625rem;
  padding: 1rem;
`;

const TextLine = styled.div`
  line-height: 1.5;
  font-size: 0.85rem;
  font-weight: bold;
  text-align: center;
`;

const BlueText = styled.span`
  color: #566cc7;
`;

const ModalImage = styled.img`
  position: absolute;
  top: -45px;
  left: 15%;
  transform: translateX(-50%);
  width: 3.9375rem;
  z-index: -1;
`;
