import React, { useEffect, useRef, useState } from "react";
import Styles from "./translate.module.css";
import singlishToUnicode from "../singlishToUnicode";

function Translate() {
  const [inputLang, setInputLang] = useState("en");
  const [outputLang, setOutputLang] = useState("si");
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [singlishInput, setSinglishInput] = useState(""); // Singlish input
  const [translatedSinglishText, setTranslatedSinglishText] = useState(""); // Singlish translation
  const [inputCharsCount, setInputCharsCount] = useState(0); // Handle character input limit

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true" || false
  );

  // Singlish Translation
  const handleSinglishInputChange = (event) => {
    const newValue = event.target.value;

    if (newValue.length > 5000) {
      setSinglishInput(newValue.slice(0, 5000));
    } else {
      setSinglishInput(newValue);
    }

    // Perform translation and update translatedText state
    const newTranslatedText = singlishToUnicode(newValue);
    setInputCharsCount(newValue.length);
    setTranslatedSinglishText(newTranslatedText);
  };

  // Translation function
  const handleTranslation = () => {
    const inputLanguageCode = inputLang;
    const outputLanguageCode = outputLang;

    // API URL
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${inputLanguageCode}&tl=${outputLanguageCode}&dt=t&q=${encodeURI(
      inputText
    )}`;

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        const translatedText = json[0].map((item) => item[0]).join("");
        setTranslatedText(translatedText); // Update React state with translated text
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInputLangChange = (event) => {
    const selectedLang = event.target.value;
    setInputLang(selectedLang);
  };

  const handleOutputLangChange = (event) => {
    setOutputLang(event.target.value);
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value;

    if (newValue.length > 5000) {
      setInputText(newValue.slice(0, 5000));
    } else {
      setInputText(newValue);
    }

    handleTranslation();
    setInputCharsCount(newValue.length);
  };

  const handleSwapLanguages = () => {
    // Swap input and output languages
    setInputLang((prevInputLang) => (prevInputLang === "en" ? "si" : "en"));
    setOutputLang((prevOutputLang) => (prevOutputLang === "en" ? "si" : "en"));

    // Swap input and output text values using state variables
    const tempInputText = inputText;
    setInputText(translatedText);
    setTranslatedText(tempInputText);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    // Store the dark mode preference in localStorage
    localStorage.setItem("darkMode", newDarkMode);
  };

  // Set dark mode class on body element
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className={Styles.translatorContainer}>
      <div className={Styles.languageSelector}>
        <select
          className={Styles.languageDropdown}
          value={inputLang}
          onChange={handleInputLangChange}
        >
          <option value="en">English</option>
          <option value="si">සිංහල</option>
        </select>
        <div className={Styles.swapPosition}>
          <ion-icon
            name="swap-horizontal-outline"
            onClick={handleSwapLanguages}
          ></ion-icon>
        </div>
        <select
          className={Styles.languageDropdown}
          value={outputLang}
          onChange={handleOutputLangChange}
        >
          <option value="si">සිංහල</option>
          <option value="en">English</option>
        </select>
      </div>

      <div className={Styles.translationBoxes}>
        {inputLang === "si" && (
          <div className={Styles.inputBox}>
            <div className={Styles.textArea}>
              <textarea
                placeholder="Singlish වලින් ලියන්න..."
                autoFocus
                value={singlishInput}
                onChange={handleSinglishInputChange}
              />
              <div className={Styles.chars}>
                <span className={Styles.inputChars}>{inputCharsCount}</span> /
                5000
              </div>
            </div>
          </div>
        )}

        <div className={Styles.inputBox}>
          <div className={Styles.textArea}>
            <textarea
              id="translation-input"
              placeholder={`Enter text in ${
                inputLang === "si" ? "Sinhala..." : "English..."
              }`}
              value={inputLang === "si" ? translatedSinglishText : inputText}
              onChange={handleInputChange}
            />
            {/* if input language is Sinhala chars will be hidden in normal input box */}
            {inputLang === "si" ? (
              <div className={Styles.chars} style={{ display: "none" }}>
                <span className={Styles.inputChars}>{inputCharsCount}</span> /
                5000
              </div>
            ) : (
              <div className={Styles.chars}>
                <span className={Styles.inputChars}>{inputCharsCount}</span> /
                5000
              </div>
            )}
          </div>
        </div>

        <div className={Styles.outputBox}>
          <textarea
            id="translation-output"
            placeholder={`Translated text in ${
              outputLang === "si" ? "Sinhala" : "English"
            }`}
            value={translatedText}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

export default Translate;
