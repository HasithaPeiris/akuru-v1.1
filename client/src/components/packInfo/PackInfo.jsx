import React, { useEffect, useState } from "react";
import styles from "./packInfo.module.css";
import { publicRequest } from "../../requestMethods";

function PackInfo({ name }) {
  const [pack, setPack] = useState({});
  const [font, setFont] = useState({});

  // fetch pack from DB
  useEffect(() => {
    const getPack = async () => {
      try {
        const res = await publicRequest.get("/packs/" + name);
        setPack(res.data);
      } catch {}
    };
    getPack();
  }, [name]);

  // fetch font from DB
  useEffect(() => {
    const getFont = async () => {
      try {
        const res = await publicRequest.get("/fonts/" + name);
        setFont(res.data);
      } catch {}
    };
    getFont();
  }, [name]);

  return (
    <div className={styles.packInfo}>
      <div className={styles.packInfoContainer}>
        by: <span className={styles.author}>{pack.author}</span>
        <div className={styles.description}>
          <p>{pack.description}</p>
        </div>
        License: <span className={styles.license}>{pack.license}</span>
      </div>
    </div>
  );
}

export default PackInfo;
