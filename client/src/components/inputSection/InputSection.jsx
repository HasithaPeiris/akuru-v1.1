import React, { useEffect, useRef, useState } from "react";
import unicodeConverter from "./unicodeConverter";
import styles from "./inputSection.module.css";

function InputSection({ onInputChange, initialFontSize }) {
  const [fontSize, setFontSize] = useState(initialFontSize || 32);
  const [textInput, setText] = useState("");

  // make reference for input
  const textInputRef = useRef(null);

  // input section - handle font size
  const handleFontSizeChange = (event) => {
    const newSize = event.target.value;
    setFontSize(newSize);

    // Notify the parent component about the fontSize change
    if (onInputChange) {
      onInputChange(textInput, newSize);
    }
  };

  // save to local storage
  const saveToLocalStorage = (textInput, input) => {
    localStorage.setItem("textInput", textInput);
    localStorage.setItem("input", input);
  };

  // input section - handle input
  const handleTextChange = (event) => {
    const newText = event.target.value;
    const newConvertedText = unicodeConverter(newText);
    setText(newConvertedText);

    // Batch the storage calls
    saveToLocalStorage(newConvertedText, newText);

    // Notify the parent component about the textInput change
    if (onInputChange) {
      onInputChange(newConvertedText, fontSize);
    }
  };

  // input section - save state of the input
  useEffect(() => {
    const savedTextInput = localStorage.getItem("textInput");
    const savedInput = localStorage.getItem("input");
    if (savedTextInput) {
      setText(savedTextInput);
      if (textInputRef.current) {
        textInputRef.current.value = savedInput;
      }

      // Notify the parent component about the initial values
      if (onInputChange) {
        onInputChange(savedTextInput, fontSize);
      }
    }
  }, [onInputChange, fontSize]);

  return (
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
  );
}

export default InputSection;
