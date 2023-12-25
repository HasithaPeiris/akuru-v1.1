import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import FontPreview from "./pages/fontPreview/FontPreview";
import FontPackPreview from "./pages/fontPackPreview/FontPackPreview";
import FontsPage from "./pages/fontsPageClone/FontsPage";
import FontCard from "./components/fontCard/FontCard";
import Converter from "./pages/converter/Converter";
import PackCard from "./components/packCard/PackCard";
import PackInfo from "./components/packInfo/PackInfo";
import InputSection from "./components/inputSection/InputSection";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/fonts/:fontName" element={<FontPreview />}></Route>
            <Route
              path="fonts/packs/:packName"
              element={<FontPackPreview />}
            ></Route>
            <Route path="/fonts" element={<FontsPage />}></Route>
            {/* <Route path="/converter" element={<Converter />}></Route> */}
            <Route path="/card" element={<FontCard />}></Route>
            <Route path="/pack-info" element={<PackInfo />}></Route>
            <Route path="/fonts/pack-card" element={<PackCard />}></Route>
            <Route path="/input-section" element={<InputSection />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
