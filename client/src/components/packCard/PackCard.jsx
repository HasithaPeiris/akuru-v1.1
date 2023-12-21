import React, { useEffect, useState } from "react";
import styles from "./packCard.module.css";
import DownloadIcon from "@mui/icons-material/Download";
import { publicRequest } from "../../requestMethods";

function PackCard({ packName, textInput, fontSize }) {
  const [pack, setPack] = useState({});

  // fetch font from DB
  useEffect(() => {
    const getPack = async () => {
      try {
        const res = await publicRequest.get("/packs/" + packName);
        setPack(res.data);
      } catch {}
    };
    getPack();
  }, [packName]);

  return (
    <div className={styles.packCard}>
      <div className={styles.packCardContainer}>
        <span className={styles.packName}>{pack.packName}</span>
        <div className={styles.packPreview}>
          <span
            style={{
              fontSize: `${fontSize}px`,
            }}
          >
            {textInput || "leu;s fohla ,shkak'"}
          </span>
        </div>
      </div>

      <div className={styles.button}>
        <DownloadIcon className={styles.buttonIcon} />
      </div>
    </div>
  );
}

export default PackCard;
