import classes from "./buttonWithUnderlineAndUndertext.module.scss";

// Span of text for each button
const MainImageSpan = ({
  children = "Please insert a text here",
  fontType = "h3",
  fontSize,
  boolean,
}) => {
  const FontType = fontType;

  return (
    <span className={classes.mainImageSpan}>
      <FontType
        style={{ fontSize }}
        className={`${classes.mainImageSpanText} ${
          boolean ? classes.activeClass : ""
        }`}
      >
        {children}
      </FontType>
    </span>
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
        <MainImageSpan
          fontSize={fontSize}
          fontType={fontType}
          boolean={boolean}
        >
          {children}
        </MainImageSpan>
      </div>
    </div>
  );
};

export default ButtonWithUnderlineAndUndertext;
