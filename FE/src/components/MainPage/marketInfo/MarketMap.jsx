import { useState } from "react";

const MarketMap = () => {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
  const [address, setAddress] = useState("");
  const [mapCenter, setMapCenter] = useState({
    lat: 37.3595704,
    lng: 127.105399,
  });
  const zoom = 10;
  const width = 390;
  const height = 650;
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/api/map-geocode/v2/geocode?query=${encodeURIComponent(address)}`,
        {
          headers: {
            "X-NCP-APIGW-API-KEY-ID": clientId,
            "X-NCP-APIGW-API-KEY": clientSecret,
          },
        }
      );
      const data = await response.json();
      if (data.addresses && data.addresses.length > 0) {
        const { x, y } = data.addresses[0];
        setMapCenter({ lat: y, lng: x });
      } else {
        alert("주소를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("주소 검색 중 오류가 발생했습니다.");
    }
  };

  const mapUrl = `https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?w=${width}&h=${height}&center=${mapCenter.lng},${mapCenter.lat}&level=${zoom}&X-NCP-APIGW-API-KEY-ID=${clientId}`;

  return (
    <div>
      {/* <h1>네이버 지도</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={address}
          onChange={handleAddressChange}
          placeholder="도로명 주소를 입력하세요"
        />
        <button type="submit">검색</button>
      </form> */}
      <img src={mapUrl} alt="네이버 지도" />
    </div>
  );
};

export default MarketMap;
