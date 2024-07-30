import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Market from "./pages/Market";
import Notfound from "./pages/Notfound";
import QRscan from "./pages/QRscan";
import MyScanMarket from "./pages/MyScanMarket";
import MarketDetail from "./pages/MarketDetail";
import ChatBot from "./pages/ChatBot";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/market/:id" element={<Market />} />
        <Route path="/qrscan" element={<QRscan />} />
        <Route path="/myscanmarket" element={<MyScanMarket />} />
        <Route path="/marketdetail" element={<MarketDetail />} />
        <Route path="/chat/:marketName" element={<ChatBot />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
};

export default App;
