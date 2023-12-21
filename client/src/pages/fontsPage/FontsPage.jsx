import styles from "./fontsPage.module.css";
import FontCard from "../../components/fontCard/FontCard";
import PackCard from "../../components/packCard/PackCard";
import unicodeConverter from "../unicodeConverter";
import { getFonts } from "../../redux/apiCalls/fontApiCalls";
import { getPacks } from "../../redux/apiCalls/packApiCalls";
import ShowcaseImages from "./showcaseImages";
import FontsShowcase from "../../components/fontsShowcase/FontsShowcase";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function FontsPage() {
  const [query, setQuery] = useState("");
  const [fontSize, setFontSize] = useState(32);
  const [textInput, setText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [currentView, setCurrentView] = useState("FONTS");

  // fetch fonts from DB
  const dispatch = useDispatch();
  const fonts = useSelector((state) => state.font.fonts);
  const packs = useSelector((state) => state.pack.packs);

  useEffect(() => {
    getFonts(dispatch);
    getPacks(dispatch);
  }, [dispatch]);

  // make reference for input
  const textInputRef = useRef(null);

  const keys = ["name", "family"];

  // fetch and search fonts
  // const search = (data) => {
  //   return fonts.filter((font) =>
  //     keys.some((key) => font[key].toLowerCase().includes(data.toLowerCase()))
  //   );
  // };

  const search = (data) => {
    const filteredFonts = (fonts || []).filter((font) =>
      keys.some((key) => font[key]?.toLowerCase().includes(data.toLowerCase()))
    );

    const filteredPacks = (packs || []).filter((pack) =>
      keys.some((key) => pack[key]?.toLowerCase().includes(data.toLowerCase()))
    );

    return { fonts: filteredFonts, packs: filteredPacks };
  };

  const handleFontSizeChange = (event) => {
    const newSize = event.target.value;
    setFontSize(newSize);
  };

  const handleTextChange = (event) => {
    const newText = event.target.value;
    const newConvertedText = unicodeConverter(newText);
    setText(newConvertedText);

    localStorage.setItem("textInput", newConvertedText);
    localStorage.setItem("input", newText);
  };

  // save state of the input
  useEffect(() => {
    const savedTextInput = localStorage.getItem("textInput");
    const savedInput = localStorage.getItem("input");
    if (savedTextInput) {
      setText(savedTextInput);

      if (textInputRef.current) {
        textInputRef.current.value = savedInput;
      }
    }
  }, []);

  // handle pagination
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = search(query).slice(indexOfFirstItem, indexOfLastItem);
  // const totalPages = Math.ceil(search(query).length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const searchedItems = search(query);
  const currentItems =
    currentView === "FONTS" ? searchedItems.fonts : searchedItems.packs;
  const paginatedItems = currentItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(currentItems.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.fontsPage}>
      <div className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.headerGroup}>
            <div className={styles.logo}>
              <img className={styles.logoImg} src="./logo2.png" alt="akuru" />
            </div>
            <div className={styles.fontsSearch}>
              <input
                type="text"
                className={styles.searchInput}
                id="search-input"
                placeholder="Search Fonts"
                //value={text}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.fontsShowcase}>
        <FontsShowcase showcaseImages={ShowcaseImages} />
      </div>

      <div className={styles.fontsPageContainer}>
        <div className={styles.inputSection}>
          <div className={styles.inputBox}>
            <input
              type="text"
              className={styles.textInput}
              id="text-input"
              placeholder="කැමති දෙයක් ලියන්න..."
              ref={textInputRef}
              onChange={handleTextChange}
            />
          </div>

          <div className={styles.fontSizeSection}>
            <span className={styles.fontSizeValue}>{fontSize}px</span>
            <input
              type="range"
              className={styles.fontSize}
              id="font-size"
              min="10"
              max="100"
              value={fontSize}
              onChange={handleFontSizeChange}
            />
          </div>
        </div>

        <div className={styles.switchButtons}>
          <button
            className={currentView === "FONTS" ? styles.active : ""}
            onClick={() => setCurrentView("FONTS")}
          >
            FONTS
          </button>
          <button
            className={currentView === "PACKS" ? styles.active : ""}
            onClick={() => setCurrentView("PACKS")}
          >
            PACKS
          </button>
        </div>

        {currentView === "FONTS"
          ? paginatedItems.map((item, index) => (
              <FontCard
                key={index}
                fontName={item.name}
                textInput={textInput}
                fontSize={fontSize}
              />
            ))
          : paginatedItems.map((item, index) => (
              <PackCard
                key={index}
                packName={item.name}
                textInput={textInput}
                fontSize={fontSize}
              />
            ))}

        {/* Pagination Controls */}
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? styles.active : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FontsPage;
