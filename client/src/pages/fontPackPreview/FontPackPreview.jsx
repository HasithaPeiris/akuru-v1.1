import React, { useEffect, useRef, useState } from "react";
import styles from "./fontPackPreview.module.css";
import FontCard from "../../components/fontCard/FontCard";
import Paragraph from "../../components/paragraph/Paragraph";
import { publicRequest } from "../../requestMethods";
import unicodeConverter from "../unicodeConverter";
import { useLocation } from "react-router-dom";
import { getFonts } from "../../redux/apiCalls/fontApiCalls";
import { useDispatch, useSelector } from "react-redux";
import PackInfo from "../../components/packInfo/PackInfo";

function FontPackPreview() {
  const [pack, setPack] = useState({});
  const [fontSize, setFontSize] = useState(24);
  const [textInput, setText] = useState("");

  // fetch fonts from DB
  const dispatch = useDispatch();
  const fonts = useSelector((state) => state.font.fonts);

  // get pack name from URL
  const location = useLocation();
  const packName = location.pathname.split("/")[3];

  useEffect(() => {
    getFonts(dispatch);
  }, [dispatch]);

  // fetch pack from DB
  useEffect(() => {
    const getPack = async () => {
      try {
        const res = await publicRequest.get("/packs/" + packName);
        setPack(res.data);
      } catch {}
    };
    getPack();
  }, [packName]);

  // make reference for input
  const textInputRef = useRef(null);

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

  return (
    <div className={styles.fontPreview}>
      <div className={styles.fontPreviewContainer}>
        <div className={styles.nameSection}>
          <span className={styles.fontName}>{pack.packName}</span>

          <button className={styles.downloadButton}>Download Font</button>
        </div>

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

        <dev className={styles.bodyContent}>
          <dev className={styles.fonts}>
            {pack.fonts &&
              pack.fonts.map((fontName) => {
                const font = fonts.find((f) => f.name === fontName);
                return (
                  <FontCard
                    fontName={font.name}
                    textInput={textInput}
                    fontSize={fontSize}
                  />
                );
              })}
          </dev>

          <dev className={styles.info}>
            <PackInfo name={pack.name} />
          </dev>
        </dev>
      </div>
    </div>
  );
}

export default FontPackPreview;
