import classes from "./IMAGE.module.scss";

const ImageWithContent = ({
  src,
  text,
  textType = "h3",
  fontWeight = 300,
  fontSize,
  color = "black",
}) => {
  const FontType = textType;
  return (
    <div className={classes.imageContainer}>
      {src && <img src={src} alt="" />}

      {text && (
        <div className={classes.textArea}>
          <FontType
            style={{ fontWeight: fontWeight, fontSize: fontSize, color: color }}
          >
            {text}
          </FontType>
        </div>
      )}
    </div>
  );
};

export default ImageWithContent;
