import { useEffect, useState } from "react";
import styles from "./fontCard.module.css";
import DownloadIcon from "@mui/icons-material/Download";
import { Link } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
import { downloadFont } from "../../download";

function FontCard({ fontName, textInput, fontSize }) {
  const [font, setFont] = useState({});

  // fetch font from DB
  useEffect(() => {
    const getFont = async () => {
      try {
        const res = await publicRequest.get("/fonts/" + fontName);
        setFont(res.data);
      } catch {}
    };
    getFont();
  }, [fontName]);

  return (
    <div className={styles.fontCard}>
      <Link to={"/fonts/" + font.name}>
        <div className={styles.fontCardContainer}>
          <span className={styles.fontName}>{font.family}</span>
          <div className={styles.fontPreview}>
            <span
              style={{
                fontSize: `${fontSize}px`,
                fontFamily: `${font.family}`,
              }}
            >
              {textInput || "leu;s fohla ,shkak'"}
            </span>
          </div>
        </div>
      </Link>
      <div
        className={styles.button}
        onClick={() => downloadFont(font.fontFile, font.family)}
      >
        <DownloadIcon className={styles.buttonIcon} />
      </div>
    </div>
  );
}

export default FontCard;
