import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import FontPreview from "./pages/fontPreview/FontPreview";
import FontPackPreview from "./pages/fontPackPreview/FontPackPreview";
import FontsPage from "./pages/fontsPageClone/FontsPage";
import FontCard from "./components/fontCard/FontCard";
import Converter from "./pages/converter/Converter";
import PackCard from "./components/packCard/PackCard";
import PackInfo from "./components/packInfo/PackInfo";
import InputSection from "./components/inputSection/InputSection";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { grey, blueGrey } from "@mui/material/colors";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const theme = createTheme({
  palette: {
    primary: grey,
    secondary: blueGrey,
  },
  typography: {
    fontFamily: "poppins",
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <div className="App">
            <div className={styles.content}>
              <Header />
              <Routes>
                <Route
                  path="/fonts/:fontName"
                  element={<FontPreview />}
                ></Route>
                <Route
                  path="fonts/packs/:packName"
                  element={<FontPackPreview />}
                ></Route>
                <Route path="/" element={<FontsPage />}></Route>
                <Route path="/converter" element={<Converter />}></Route>
                <Route path="/card" element={<FontCard />}></Route>
                <Route path="/pack-info" element={<PackInfo />}></Route>
                <Route path="/fonts/pack-card" element={<PackCard />}></Route>
                <Route path="/input-section" element={<InputSection />}></Route>
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
