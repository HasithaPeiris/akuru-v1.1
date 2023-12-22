import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import FontPreview from "./pages/fontPreview/FontPreview";
import FontPackPreview from "./pages/fontPackPreview/FontPackPreview";
import FontsPage from "./pages/fontsPage/FontsPage";
import FontCard from "./components/fontCard/FontCard";
import Translate from "./pages/Translate/Translate";
import CheckerDemo from "./pages/GrammerCheck/CheckerDemo";
import Converter from "./pages/converter/Converter";
import PackCard from "./components/packCard/PackCard";
import PackInfo from "./components/packInfo/PackInfo";

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
            <Route path="/translator" element={<Translate />}></Route>
            <Route path="/checker" element={<CheckerDemo />}></Route>
            <Route path="/converter" element={<Converter />}></Route>
            <Route path="/card" element={<FontCard />}></Route>
            <Route path="/pack-info" element={<PackInfo />}></Route>
            <Route path="/fonts/pack-card" element={<PackCard />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
