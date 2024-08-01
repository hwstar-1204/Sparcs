import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import MainPage from "./pages/MainPage";
import Notfound from "./pages/Notfound";
import QRscan from "./pages/QRscan";
import MyScanMarket from "./pages/MyScanMarket";
import ChatBot from "./pages/ChatBot";
import InfoModal from "./components/MainPage/InfoModal";
const App = () => {
  const [infoModalIsOpen, setInfoModalIsOpen] = useState(true);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/qrscan" element={<QRscan />} />
        <Route path="/myscanmarket" element={<MyScanMarket />} />
        <Route path="/chat/:marketName" element={<ChatBot />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
      <InfoModal
        isOpen={infoModalIsOpen}
        onRequestClose={() => setInfoModalIsOpen(false)}
      />
    </>
  );
};

export default App;
