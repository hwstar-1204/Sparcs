import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { RiHome2Line } from "react-icons/ri";
import { AiOutlineScan } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import { MdOutlineQrCodeScanner } from "react-icons/md";

const NavigationBar = () => {
  const nav = useNavigate();
  const location = useLocation();
  const [selectedButton, setSelectedButton] = useState("market");

  useEffect(() => {
    // 현재 경로에 따라 선택된 버튼 업데이트
    if (location.pathname === "/") {
      setSelectedButton("market");
    } else if (location.pathname === "/qrscan") {
      setSelectedButton("qrscan");
    } else if (location.pathname === "/myscanmarket") {
      setSelectedButton("myscan");
    }
  }, [location.pathname]);

  const handleMarketInfo = () => {
    nav("/");
  };

  const handleQrScan = () => {
    nav("/qrscan");
  };

  const handleMyQRScan = () => {
    nav("/myscanmarket");
  };

  return (
    <NavigationLayout>
      <SelectContainer>
        <SelectBtn
          onClick={handleMarketInfo}
          isSelected={selectedButton === "market"}
        >
          <RiHome2Line size={"1.7rem"} />
          <div>가게 안내</div>
        </SelectBtn>
        <QrScanBtn
          onClick={handleQrScan}
          isSelected={selectedButton === "qrscan"}
        >
          <MdOutlineQrCodeScanner size={"2rem"} />
          <div>QR 스캔</div>
        </QrScanBtn>
        <SelectBtn
          onClick={handleMyQRScan}
          isSelected={selectedButton === "myscan"}
        >
          <AiOutlineScan size={"1.7rem"} />
          <div>스캔 기록</div>
        </SelectBtn>
      </SelectContainer>
    </NavigationLayout>
  );
};

export default NavigationBar;

const NavigationLayout = styled.div`
  height: 3.75rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
`;

const SelectBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50%;
  height: 2.3rem;
  cursor: pointer;
  position: relative;
  color: ${(props) => (props.isSelected ? "#566CC7" : "black")};
  transition: color 0.3s ease;

  div {
    font-size: 0.625rem;
    margin-top: 0.25rem;
    font-weight: bold;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -0.45rem;
    left: 0;
    width: 100%;
    height: 2px;
    transform: scaleX(${(props) => (props.isSelected ? 1 : 0)});
    transition: transform 0.3s ease;
  }
`;

const QrScanBtn = styled.div`
  background-color: ${(props) => (props.isSelected ? "#566CC7" : "#fff")};
  border-radius: 50%;
  width: 6rem;
  height: 4.8rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: -2rem;
  color: ${(props) => (props.isSelected ? "#fff" : "#000")};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, color 0.3s ease;
  cursor: pointer;

  div {
    font-size: small;
    font-weight: bold;
  }
`;
