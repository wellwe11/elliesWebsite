import classes from "./mainImageWithContent.module.scss";

export const MainImageWithContent = ({
  src,
  text,
  textType = "h3",
  fontWeight = 300,
  fontSize,
  color = "black",
}) => {
  const FontType = textType;

  return (
    <div className={classes.mainImageContainer}>
      {src && <img src={src} alt="" />}

      {text && (
        <div className={classes.textArea}>
          <FontType
            className={classes.fontType}
            style={{ fontWeight: fontWeight, fontSize: fontSize, color: color }}
          >
            {text}
          </FontType>
        </div>
      )}
    </div>
  );
};
