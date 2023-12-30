import { useState } from "react";
import styles from "./paragraph.module.css";

function Paragraph({ fontFamily, fontType }) {
  const [fontSize, setFontSize] = useState(20);
  const [fontWeight, setFontWeight] = useState("");

  const handleFontSizeChange = (event) => {
    setFontSize(parseInt(event.target.value, 10));
  };

  const handleFontWeightChange = (event) => {
    setFontWeight(event.target.value);
  };

  return (
    <div className={styles.paragraph}>
      <div className={styles.paraContainer}>
        <select
          className={styles.selector}
          id="fontSizeSelector"
          value={fontSize}
          onChange={handleFontSizeChange}
        >
          <option value={12}>12px</option>
          <option value={16}>16px</option>
          <option value={20}>20px</option>
          <option value={24}>24px</option>
          <option value={28}>28px</option>
          <option value={32}>32px</option>
        </select>

        <select
          className={styles.selector}
          id="fontWeightSelector"
          value={fontWeight}
          onChange={handleFontWeightChange}
        >
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
        </select>

        {fontType === "unicode" ? (
          <div className={styles.para}>
            <p
              style={{
                fontFamily: `${fontFamily}`,
                fontSize: `${fontSize}px`,
                fontWeight,
              }}
            >
              ;jo hï mqoa.,hl= wh;ajk rfÜ foaYmd,k" kS;suh fyda cd;Hka;r
              ;;a;ajhka lsisÿ úfYaIhla o ta rfÜ iajdëk" Ndrldr" wiajdëk wd§ ljr
              ;;a;ajhla úfYaIhla o fkdue;sj fï ysñlï Tyq i;= jkafkah¡ iEu
              mqoa.,fhl=gu Ôj;aùug;a ksoyiaj is;Sug;a fm!oa.,sl wdrlaIdjg;a
              ysñlï we;af;ah¡ lsisu mqoa.,fhl= jy,a lfuys fyda nkaOkfhys
              ^odi;ajfhys& fkd/|úh hq;=h¡ iEu wdldrhlu jy,a yd jy,alu ;ykï
              jkafkah¡ lsisu mqoa.,hl= jO ysxidjg fyda lDDr" wudkqIsl my;a fyda
              oඬqjulg fyda Ndckh fkdl hq;=h¡
            </p>
          </div>
        ) : (
          <div className={styles.para}>
            <p
              style={{
                fontFamily: `${fontFamily}`,
                fontSize: `${fontSize}px`,
                fontWeight,
              }}
            >
              තවද යම් පුද්ගලයකු අයත්වන රටේ දේශපාලන, නීතිමය හෝ ජාත්‍යන්තර
              තත්ත්වයන් පිළිබඳ කිසිදු විශේෂයක් ද ඒ රටේ ස්වාධීන, භාරකාර, අස්වාධීන
              ආදී කවර තත්ත්වයක් පිළිබඳ විශේෂයක් ද නොමැතිව මේ හිමිකම් ඔහු සතු
              වන්නේය. සෑම පුද්ගලයෙකුටම ජීවත්වීමටත් නිදහස්ව සිතීමටත් පෞද්ගලික
              ආරක්ෂාවටත් හිමිකම් ඇත්තේය. කිසිම පුද්ගලයෙකු වහල් කමෙහි හෝ
              බන්ධනයෙහි නොරැඳවිය යුතුය. සෑම ආකාරයකම වහල් වෙළඳාම හා වහල්කම තහනම්
              වන්නේය. කිසිම පුද්ගලයකු වධ හිංසාවට හෝ කෲර, අමානුෂික පහත්
              සැළකිල්ලකට හෝ දඬුවමකට හෝ භාජනය නොකළ යුතුය.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Paragraph;
