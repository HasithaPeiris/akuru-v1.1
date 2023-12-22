import React, { useEffect, useState } from "react";
import styles from "./packCard.module.css";
import DownloadIcon from "@mui/icons-material/Download";
import { publicRequest } from "../../requestMethods";
import { Link } from "react-router-dom";

function PackCard({ packName, textInput, fontSize }) {
  const [pack, setPack] = useState({});
  const [fontFamily, setFontFamily] = useState("inherit");

  // fetch font from DB
  useEffect(() => {
    const getPack = async () => {
      try {
        const res = await publicRequest.get("/packs/" + packName);
        setPack(res.data);

        // Extract the first font from the fonts array
        if (res.data.fonts && res.data.fonts.length > 0) {
          const firstFont = res.data.fonts[0].replace(/-/g, " ");
          setFontFamily(firstFont);
        }
      } catch (error) {
        console.error("Error fetching pack:", error);
      }
    };
    getPack();
  }, [packName]);

  return (
    <div className={styles.packCard}>
      <Link to={"/fonts/packs/" + pack.name}>
        <div className={styles.packCardContainer}>
          <span className={styles.packName}>{pack.packName}</span>

          <div className={styles.packPreview}>
            <span
              style={{
                fontSize: `${fontSize}px`,
                fontFamily: fontFamily,
              }}
            >
              {textInput || "leu;s fohla ,shkak'"}
            </span>
          </div>
        </div>
      </Link>
      <div className={styles.button}>
        <DownloadIcon className={styles.buttonIcon} />
      </div>
    </div>
  );
}

export default PackCard;
