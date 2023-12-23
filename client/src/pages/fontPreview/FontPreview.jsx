import React, { useEffect, useState } from "react";
import styles from "./fontPreview.module.css";
import Alphabet from "../../components/alphabet/Alphabet";
import Symbols from "../../components/symbols/Sysmbols";
import Paragraph from "../../components/paragraph/Paragraph";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
import { downloadFont } from "../../download";
import PackInfo from "../../components/packInfo/PackInfo";
import InputSection from "../../components/inputSection/InputSection";
import { ClipLoader } from "react-spinners";

function FontPreview() {
  const [fontSize, setFontSize] = useState(44);
  const [textInput, setText] = useState("");
  const [font, setFont] = useState({});
  const [loading, setLoading] = useState(true);

  // receive data from the input section
  const handleInputChange = (textInput, fontSize) => {
    setText(textInput);
    setFontSize(fontSize);
  };

  // get font name from URL
  const location = useLocation();
  const fontName = location.pathname.split("/")[2];

  // fetch font from DB
  useEffect(() => {
    const getFont = async () => {
      try {
        const res = await publicRequest.get("/fonts/" + fontName);
        setFont(res.data);
      } catch {
      } finally {
        setLoading(false);
      }
    };
    getFont();
  }, [fontName]);

  const handleDownload = () => {
    setLoading(true);

    downloadFont(font.fontFile, font.family, () => {
      setLoading(false);
    });
  };

  // Render loading spinner
  if (loading) {
    return (
      <div className={styles.loader}>
        <ClipLoader color="#999" size={34} />
      </div>
    );
  }

  return (
    <div className={styles.fontPreview}>
      <div className={styles.fontPreviewContainer}>
        <div className={styles.nameSection}>
          <span className={styles.fontName}>{font.family}</span>

          <button
            className={styles.downloadButton}
            onClick={handleDownload}
            disabled={loading}
          >
            {loading ? (
              <ClipLoader color="#ffffff" size={20} />
            ) : (
              "Download Font"
            )}
          </button>
        </div>

        <div className={styles.previewBox}>
          <p
            style={{ fontSize: `${fontSize}px`, fontFamily: `${font.family}` }}
          >
            {textInput || "leu;s fohla ,shkak'"}
          </p>
        </div>

        <InputSection onInputChange={handleInputChange} initialFontSize={44} />

        <dev className={styles.bodyContent}>
          <dev className={styles.alphabet}>
            <Alphabet fontFamily={font.family} />
            <Symbols fontFamily={font.family} />
          </dev>

          <dev className={styles.paragraph}>
            <Paragraph fontFamily={font.family} />
          </dev>
        </dev>
        <PackInfo />
      </div>
    </div>
  );
}

export default FontPreview;
