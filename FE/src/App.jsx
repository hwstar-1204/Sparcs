import { Routes, Route, useNavigate } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Notfound from "./pages/Notfound";
import QRscan from "./pages/QRscan";
import MyScanMarket from "./pages/MyScanMarket";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/qrscan" element={<QRscan />} />
        <Route path="/myscanmarket" element={<MyScanMarket />} />

        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
};

export default App;
