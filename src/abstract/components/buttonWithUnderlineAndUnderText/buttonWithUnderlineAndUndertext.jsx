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

const UnderlineSpan = ({ fontSize = 30, boolean }) => {
  const [updatedFontSize, setUpdatedFontSize] = useState(fontSize);
  const [fontSizeType, setFontSizeType] = useState(null);

  // imports font-size and removes anything except numbers. If prop is '30px', 30 will remain
  // caveat: fontSize = clamp(30px, 5vw, 50px) will return 30550, which is a size we dont want.
  const validateFontSize = () => {
    if (typeof fontSize === "string") {
      let removeNumbers = fontSize.replace(/[0-9]/g, "");
      let removeLetters = fontSize.replace(/[a-zA-Z]/g, "");

      setUpdatedFontSize(+removeLetters);
      setFontSizeType(removeNumbers);
    } else {
      return setUpdatedFontSize(fontSize);
    }
  };

  useEffect(() => {
    validateFontSize();
  }, [fontSize]);

  const buttonHoveringElement = (
    <div className={classes.buttonHoveringElement}>
      <p
        className={classes.buttonHoveringText}
        style={{
          fontSize: `${
            fontSizeType?.includes("vw")
              ? updatedFontSize * 9
              : updatedFontSize / 2
          }px`, // underline will always be smaller than text. Looks better
        }}
      >
        explore
      </p>
    </div>
  );

  return (
    <div
      className={`${classes.underlineSpanContainer} ${
        boolean ? classes.activeClass : ""
      }`}
    >
      <div className={classes.underlineSpan} />
      {buttonHoveringElement}
    </div>
  );
};

const ButtonWithUnderlineAndUndertext = ({
  children,
  fontSize,
  fontType,
  boolean,
}) => {
  return (
    <div className={classes.mainImageWrapperText}>
      <div className={classes.mainImageWrapper}>
        <MainImageSpan fontSize={fontSize} fontType={fontType}>
          {children}
        </MainImageSpan>
        <UnderlineSpan fontSize={fontSize} boolean={boolean} />
      </div>
    </div>
  );
};

export default ButtonWithUnderlineAndUndertext;
