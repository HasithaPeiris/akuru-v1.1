import styles from "./App.module.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  About,
  FontsPage,
  Contact,
  FontPreview,
  FontPackPreview,
  Converter,
} from "./pages/index";
import { Header, Footer, SideGraphic } from "./components/index";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { grey, blueGrey } from "@mui/material/colors";

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
                <Route path="/" element={<FontsPage />}></Route>
                <Route
                  path="/fonts/:fontName"
                  element={<FontPreview />}
                ></Route>
                <Route
                  path="fonts/packs/:packName"
                  element={<FontPackPreview />}
                ></Route>
                <Route path="/converter" element={<Converter />}></Route>
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
              <SideGraphic />
            </div>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
