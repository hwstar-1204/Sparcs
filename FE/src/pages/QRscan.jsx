import styled from "styled-components";
import { IoArrowBack } from "react-icons/io5";
import NavigationBar from "../components/common/NavigationBar";

const QRLayout = styled.div`
  height: 100vh;
  background-color: #b2c7da;
`;
const QRscan = () => {
  return (
    <QRLayout>
      <IoArrowBack onClick />
      <div>QR을 스캔해보세요!</div>
      <div>QR의 위치는 각 가게 메뉴판 우측 상단에 있습니다.</div>
      <NavigationBar />
    </QRLayout>
  );
};

export default QRscan;
