import React, { useEffect, useRef, useState } from "react";
import styles from "./converter.module.css";
import unicodeConverter from "./unicodeConverter";
import singlishToUnicode from "./singlishToUnicode";
import { ContentCopy, Done, Clear } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";

function Converter() {
  const [singlishText, setSinglishText] = useState("");
  const [unicodeText, setUnicodeText] = useState("");
  const [showUnicodeOutput, setShowUnicodeOutput] = useState(true);
  const [copyIcon, setCopyIcon] = useState("default");

  // make reference for input
  const textInputRef = useRef(null);

  const textareaRef = useRef();

  useEffect(() => {
    adjustTextareaHeight();
    scrollToBottom();
  }, [showUnicodeOutput, unicodeText, singlishText]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  // save to local storage
  const saveToLocalStorage = (value, singlishText, unicodeText) => {
    localStorage.setItem("value", value);
    localStorage.setItem("singlishText", singlishText);
    localStorage.setItem("unicodeText", unicodeText);
  };

  const handleSinglishConversion = (event) => {
    const value = event.target.value;
    const newSinhalaText = singlishToUnicode(value);
    const newUnicodeText = unicodeConverter(value);

    if (showUnicodeOutput) {
      setUnicodeText(newUnicodeText);
    } else {
      setSinglishText(newSinhalaText);
    }

    // Batch the storage calls
    saveToLocalStorage(value, newSinhalaText, newUnicodeText);
  };

  useEffect(() => {
    let savedValue = localStorage.getItem("value");
    let savedSinglishText = localStorage.getItem("singlishText");
    let savedUnicodeText = localStorage.getItem("unicodeText");
    if (savedSinglishText || savedUnicodeText) {
      if (textInputRef.current) {
        textInputRef.current.value = savedValue;
      }

      if (showUnicodeOutput) {
        setUnicodeText(savedUnicodeText);
      } else {
        setSinglishText(savedSinglishText);
      }
    }
  }, [showUnicodeOutput]);

  const handleSwitchChange = (outputType) => {
    setShowUnicodeOutput(outputType === "UNICODE");
  };

  const handleCopyToClipboard = () => {
    const textToCopy = showUnicodeOutput ? unicodeText : singlishText;

    if (!textToCopy) {
      return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = textToCopy;

    document.body.appendChild(textarea);

    textarea.select();
    document.execCommand("copy");

    document.body.removeChild(textarea);

    setCopyIcon("copied");

    setTimeout(() => {
      setCopyIcon("default");
    }, 2000);
  };

  const handleClearText = () => {
    setSinglishText("");
    setUnicodeText("");
    if (textInputRef.current) {
      textInputRef.current.value = "";
    }

    saveToLocalStorage("", "", "");
  };

  return (
    <div className={styles.converterContainer}>
      <div className={styles.convertBoxes}>
        <div className={styles.stickyBox}>
          <div className={styles.inputBox}>
            <div className={styles.textArea}>
              <textarea
                id="convert-input"
                placeholder="Singlish වලින් ලියන්න..."
                ref={textInputRef}
                onChange={handleSinglishConversion}
              />
            </div>
          </div>
        </div>
        <div className={styles.outputBox}>
          <div className={styles.textArea}>
            <textarea
              id="convert-input"
              placeholder={
                showUnicodeOutput ? "hqksfldaâ j,ska¡¡¡" : "ලෙගසි වලින්..."
              }
              value={showUnicodeOutput ? unicodeText : singlishText}
              style={
                showUnicodeOutput
                  ? { fontFamily: "FM Abhaya" }
                  : { fontFamily: "Abhaya Libre" }
              }
              readOnly
              ref={textareaRef}
              onChange={() => {
                adjustTextareaHeight();
                scrollToBottom();
              }}
            />
          </div>
        </div>

        <div className={styles.toolbar}>
          <div className={styles.switchButtons}>
            <button
              className={
                showUnicodeOutput ? styles.activeButton : styles.button
              }
              onClick={() => handleSwitchChange("UNICODE")}
            >
              UNICODE
            </button>
            <button
              className={
                !showUnicodeOutput ? styles.activeButton : styles.button
              }
              onClick={() => handleSwitchChange("LEGACY")}
            >
              LEGACY
            </button>
            <Tooltip title="Copy to Clipboard" arrow>
              <button className={styles.button} onClick={handleCopyToClipboard}>
                {copyIcon === "default" ? <ContentCopy /> : <Done />}
              </button>
            </Tooltip>
            <Tooltip title="Clear all text" arrow>
              <button className={styles.button} onClick={handleClearText}>
                <Clear />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Converter;
