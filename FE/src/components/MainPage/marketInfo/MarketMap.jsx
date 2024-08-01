import { useState, useEffect } from "react";
import TargetInfo from "../MarkInfo";
import image from "../../../assets/marketImg/캡처.jpg";
import image3 from "../../../assets/marketImg/green.jpg";
import image4 from "../../../assets/marketImg/gwang.jpg";
import image5 from "../../../assets/marketImg/h.jpg";
import image6 from "../../../assets/marketImg/ha.jpg";
import image7 from "../../../assets/marketImg/hometown.jpg";
import image8 from "../../../assets/marketImg/ja.jpg";
import image9 from "../../../assets/marketImg/ky.jpg";
import image10 from "../../../assets/marketImg/market2.jpg";
import image11 from "../../../assets/marketImg/market3.jpg";
import image12 from "../../../assets/marketImg/market4.jpg";
import image15 from "../../../assets/marketImg/market1.jpg";
import image16 from "../../../assets/marketImg/kang.jpg";
import image17 from "../../../assets/marketImg/jin.jpg";
import image18 from "../../../assets/marketImg/jra.jpg";
import image19 from "../../../assets/marketImg/hi.jpg";

const Map = () => {
  const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    // 지도 초기화
    const map = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(37.569999, 126.9998999), // 잠실 롯데월드를 중심으로 하는 지도
      zoom: 17,
    });

    // 마커 데이터 예시
    const markersData = [
      {
        position: new naver.maps.LatLng(37.5705941, 127.0007294),
        title: "원조 순희네 빈대떡",
        category: "떡,전",
        address: "서울특별시 종로구 종로5가 138-9",
        img: image15,
      },
      {
        position: new naver.maps.LatLng(37.570535, 127.0008248),
        title: "박가네 빈대떡",
        category: "떡,전",
        address: "서울특별시 종로구 종로5가 138-10",
        img: image10,
      },
      {
        position: new naver.maps.LatLng(37.5702805, 126.9987951),
        title: "60년전통떡집",
        category: "떡,전",
        address: "서울특별시 종로구 예지동 2-1",
        img: image11,
      },
      {
        position: new naver.maps.LatLng(37.5707183, 127.0004841),
        title: "광장호떡",
        category: "분식",
        address: "서울특별시 종로구 종로4가 185-1 북2문 바로 앞",
        img: image4,
      },
      {
        position: new naver.maps.LatLng(37.5702936, 127.0011008),
        title: "모녀김밥",
        category: "분식",
        address: "서울특별시 종로구 종로5가 395-4",
        img: image19,
      },
      {
        position: new naver.maps.LatLng(37.570638, 127.0004749),
        title: "강가네 떡볶이",
        category: "분식",
        address: "서울특별시 종로구 종로4가 185-1 북2문 바로 앞",
        img: image16,
      },
      {
        position: new naver.maps.LatLng(37.5706275, 127.0007574),
        title: "고향칼국수",
        category: "분식",
        address: "서울특별시 종로구 종로5가 138-9",
        img: image7,
      },
      {
        position: new naver.maps.LatLng(37.5706134, 127.0004198),
        title: "광장시장 찹쌀꽈배기",
        category: "베이커리",
        address: "서울특별시 종로구 종로4가 188 105호",
        img: image12,
      },
      {
        position: new naver.maps.LatLng(37.5698571, 127.001522),
        title: "경주십원빵 종로광장시장점",
        category: "베이커리",
        address: "서울특별시 종로구 종로5가 398-18 1층",
        img: image,
      },
      {
        position: new naver.maps.LatLng(37.5699262, 127.0014533),
        title: "쑥스초코파이 서울",
        category: "베이커리",
        address: "서울특별시 종로구 종로5가 398-9 1층",
        img: image3,
      },
      {
        position: new naver.maps.LatLng(37.5706327, 126.9999909),
        title: "형제육회 본점",
        category: "육류",
        address: "서울특별시 종로구 종로4가 181-1",
        img: image5,
      },
      {
        position: new naver.maps.LatLng(37.5706026, 126.9999231),
        title: "육회자매집",
        category: "육류",
        address: "서울특별시 종로구 종로4가 177",
        img: image8,
      },
      {
        position: new naver.maps.LatLng(37.5704396, 127.0012606),
        title: "진주육회",
        category: "육류",
        address: "서울특별시 종로구 종로5가 138-15",
        img: image17,
      },
      {
        position: new naver.maps.LatLng(37.5704664, 126.9998999),
        title: "창신육회 본점",
        category: "육류",
        address: "서울특별시 종로구 종로4가 165-3",
        img: image9,
      },
      {
        position: new naver.maps.LatLng(37.5703661, 127.0001802),
        title: "은성횟집",
        category: "해산물",
        address: "서울특별시 종로구 종로4가 2-1",
        img: image6,
      },
      {
        position: new naver.maps.LatLng(37.57004, 127.0009669),
        title: "전라도횟집",
        category: "해산물",
        address: "서울특별시 종로구 예지동 3-1 광장시장",
        img: image18,
      },
    ];

    // 마커 생성 및 클릭 이벤트 추가
    markersData.forEach((data) => {
      const marker = new naver.maps.Marker({
        position: data.position,
        map: map,
        title: data.title,
      });

      // 마커 클릭 시 모달 열기
      naver.maps.Event.addListener(marker, "click", () => {
        setSelectedMarker(data);
        setInfoModalIsOpen(true);
      });
    });
  }, []);

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "670px" }}></div>
      <TargetInfo
        isOpen={infoModalIsOpen}
        onRequestClose={() => setInfoModalIsOpen(false)}
        markerData={selectedMarker}
      />
    </div>
  );
};

export default Map;
