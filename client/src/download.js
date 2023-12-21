export const downloadFont = (fontFile, fontName) => {
  const link = document.createElement("a");
  link.href = fontFile;
  link.download = `${fontName.replace(/\s+/g, "-")}.ttf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
