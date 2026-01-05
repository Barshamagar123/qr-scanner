import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Generate from "./pages/Generate";
import VerifyQR from "./pages/VerifyQr";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/verify" element={<VerifyQR />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
