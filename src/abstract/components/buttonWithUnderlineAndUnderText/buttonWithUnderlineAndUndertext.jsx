import { useEffect, useState } from "react";
import classes from "./buttonWithUnderlineAndUndertext.module.scss";

// Span of text for each button
const MainImageSpan = ({
  children = "Please insert a text here",
  fontType = "h3",
  fontSize,
}) => {
  const FontType = fontType;

  return (
    <span className={classes.mainImageSpan}>
      <FontType style={{ fontSize }} className={classes.mainImageSpanText}>
        {children}
      </FontType>
    </span>
  );
};

const UnderlineSpan = ({ fontSize = 30 }) => {
  const [updatedFontSize, setUpdatedFontSize] = useState(fontSize);
  const [fontSizeType, setFontSizeType] = useState(null);

  // imports font-size and removes anything except numbers. If prop is '30px', 30 will remain
  // caveat: fontSize = clamp(30px, 5vw, 50px) will return 30550, which is a size we dont want.
  const validateFontSize = () => {
    if (typeof fontSize === "string") {
      let removeNumbers = fontSize.replace(/\d/g, "");
      let removeLetters = fontSize.replace(/\D/g, "");

      setUpdatedFontSize(+removeLetters);
      setFontSizeType(removeNumbers);
    } else {
      return setUpdatedFontSize(fontSize);
    }
  };

  console.log(fontSizeType);
  useEffect(() => {
    validateFontSize();
  }, [fontSize]);

  const buttonHoveringElement = (
    <div className={classes.buttonHoveringElement}>
      {/* Currently disabled since text below looks better */}
      {/* <ArrowSVG color="black" /> */}
      <p
        className={classes.buttonHoveringText}
        style={{
          fontSize: `${
            fontSizeType?.includes("vw")
              ? updatedFontSize * 11.5
              : updatedFontSize / 2
          }px`, // underline will always be smaller than text. Looks better
        }}
      >
        explore
      </p>
    </div>
  );

  return (
    <div className={classes.underlineSpanContainer}>
      <div className={classes.underlineSpan}></div>
      {buttonHoveringElement}
    </div>
  );
};

const ButtonWithUnderlineAndUndertext = ({ children, fontSize, fontType }) => {
  return (
    <div className={classes.mainImageWrapperText}>
      <div className={classes.mainImageWrapper}>
        <MainImageSpan fontSize={fontSize} fontType={fontType}>
          {children}
        </MainImageSpan>
        <UnderlineSpan fontSize={fontSize} />
      </div>
    </div>
  );
};

export default ButtonWithUnderlineAndUndertext;
