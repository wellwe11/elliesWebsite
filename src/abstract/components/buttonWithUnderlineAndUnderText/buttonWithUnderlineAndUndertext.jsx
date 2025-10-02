import classes from "./buttonWithUnderlineAndUndertext.module.scss";

// Span of text for each button
const TextSpan = ({
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
  children = "Please insert text",
  fontSize,
  fontType,
  boolean,
}) => {
  return (
    <div className={classes.mainImageWrapperText}>
      <div className={classes.mainImageWrapper}>
        <TextSpan fontSize={fontSize} fontType={fontType} boolean={boolean}>
          {children}
        </TextSpan>
      </div>
    </div>
  );
};

export default ButtonWithUnderlineAndUndertext;
