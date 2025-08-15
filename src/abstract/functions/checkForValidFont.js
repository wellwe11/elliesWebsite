// validates fonts. Avoids errors, also allows for fallback size if for example: "3h" is written instead of "h3"
const checkForValidFont = (fontType) => {
  if (!fontType) return;

  const validFonts = ["h1", "h2", "h3", "h4", "h5", "p", "span"];
  return validFonts.includes(fontType) ? fontType : "h3";
};

export default checkForValidFont;
