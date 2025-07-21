const checkForValidFont = (fontType) => {
  const validFonts = ["h1", "h2", "h3", "h4", "h5", "p", "span"];
  return validFonts.includes(fontType) ? fontType : "h3";
};

export default checkForValidFont;
