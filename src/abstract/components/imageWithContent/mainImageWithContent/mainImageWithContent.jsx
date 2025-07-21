import checkForValidFont from "../../../functions/checkForValidFont";
import classes from "./mainImageWithContent.module.scss";

const MainText = ({
  children,
  fontWeight = 300,
  fontSize,
  color = "black",
  fontType,
}) => {
  const FontType = checkForValidFont(fontType);
  return (
    <div className={classes.textArea}>
      <FontType
        className={classes.fontType}
        style={{ fontWeight, fontSize, color }}
      >
        {children}
      </FontType>
    </div>
  );
};

const MainImage = ({ src }) => {
  if (!src) return;

  return <img src={src} alt="" />;
};

export const MainImageWithContent = ({
  children,
  src,
  fontType,
  fontWeight,
  fontSize,
  color,
}) => {
  return (
    <div className={classes.mainImageContainer}>
      <MainText
        fontType={fontType}
        fontWeight={fontWeight}
        fontSize={fontSize}
        color={color}
      >
        {children}
      </MainText>
      <MainImage src={src} />
    </div>
  );
};
