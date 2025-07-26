import { useEffect, useState } from "react";
import classes from "./buttonWithUnderlineAndUndertext.module.scss";

const MainImageSpan = ({ children, index, fontSize = 30 }) => {
  const [displayText, setDisplayText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayText(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // smooth opacity transition which isn't entirely synced since its based on parent-elements index which is being mapped
  const spanStyle = {
    transition: `opacity ${1 + index * 0.8}s cubic-bezier(0, 0, 0, 1), filter ${
      0.5 + index * 0.1
    }s cubic-bezier(0, 0, 0, 1)`,
    opacity: displayText ? "1" : "0",
    visibility: displayText ? "visible" : "hidden",
    filter: displayText ? "blur(0px)" : "blur(20px)",
    fontSize: fontSize,
  };

  return (
    <span className={classes.mainImageSpan} style={spanStyle}>
      {children}
    </span>
  );
};

const UnderlineSpan = ({ fontSize = 30 }) => {
  const [updatedFontSize, setUpdatedFontSize] = useState(fontSize);

  const validateFontSize = () => {
    if (typeof fontSize === "string") {
      let removeLetters = fontSize.replace(/\D/g, "");
      return setUpdatedFontSize(+removeLetters);
    } else {
      return setUpdatedFontSize(fontSize);
    }
  };

  useEffect(() => {
    validateFontSize();
  }, [fontSize]);

  const arrowRightElement = (
    <div
      className={classes.arrowContainer}
      style={{
        fontSize: updatedFontSize / 2,
      }}
    >
      {/* <ArrowSVG color="black" /> */}
      explore
    </div>
  );

  return (
    <div className={classes.underlineSpanContainer}>
      <div className={classes.underlineSpan}></div>
      {arrowRightElement}
    </div>
  );
};

const ButtonWithUnderlineAndUndertext = ({
  children,
  setActiveImage,
  fontSize,
}) => {
  return (
    <div className={classes.mainImageWrapperText}>
      {children.map((t, index) => (
        <div
          key={index}
          className={classes.mainImageWrapper}
          onMouseEnter={() => setActiveImage(index)}
        >
          <MainImageSpan index={index} fontSize={fontSize}>
            {t}
            <UnderlineSpan fontSize={fontSize} />
          </MainImageSpan>
        </div>
      ))}
    </div>
  );
};

export default ButtonWithUnderlineAndUndertext;
