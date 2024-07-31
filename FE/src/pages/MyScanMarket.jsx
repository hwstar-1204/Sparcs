import axios from "axios";
const MyScanMarket = () => {
  axios
    .get(`http://101.79.10.180:8000/store_info/active_stamps/`)

    .then((res) => {
      console.log(res);
    });
  return (
    <>
      <div>내가 스캔한 가게들</div>
    </>
  );
};

export default MyScanMarket;
