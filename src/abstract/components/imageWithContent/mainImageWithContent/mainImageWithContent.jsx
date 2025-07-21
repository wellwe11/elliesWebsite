import TextThatCorrespondsToActiveImage from "@components/scrollText/scrollText";
import checkForValidFont from "../../../functions/checkForValidFont";
import classes from "./mainImageWithContent.module.scss";
import { useEffect, useState } from "react";

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

const MainImage = ({ activeImage, src }) => {
  const [activeAnimation, setActiveAnimation] = useState(false);

  useEffect(() => {
    setActiveAnimation(true);
    const timer = setTimeout(() => {
      setActiveAnimation(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [activeImage]);

  const texts = [
    "this is text one",
    "this is text two",
    "this is text three",
    "this is text three",
  ];

  const textsTitles = [
    "this is title one",
    "this is title two",
    "this is title three",
    "this is title four",
  ];

  if (!src) return;

  return (
    <div className={classes.mainImage}>
      <img
        src={src}
        alt=""
        className={`${classes.mainImageImg} ${
          activeAnimation ? classes.mainImageAnimation : ""
        }`}
      />
      <div className={classes.textAreaContainer}>
        <div className={classes.textAreaWrapper}>
          <div className={classes.textAreaTitle}>
            <MainText fontWeight={600} fontType={"h3"}>
              <TextThatCorrespondsToActiveImage
                texts={textsTitles}
                activeImage={activeImage}
              />
            </MainText>
          </div>
          <div className={classes.textAreaBio}>
            <MainText fontWeight={400} fontType={"p"}>
              <TextThatCorrespondsToActiveImage
                texts={texts}
                activeImage={activeImage}
              />
            </MainText>
          </div>
        </div>
        <div className={classes.textAreaWrapper}>
          <div className={classes.textAreaTitle}>
            <MainText fontWeight={600} fontType={"h3"}>
              <TextThatCorrespondsToActiveImage
                texts={textsTitles}
                activeImage={activeImage}
              />
            </MainText>
          </div>
          <div className={classes.textAreaBio}>
            <MainText fontWeight={400} fontType={"p"}>
              <TextThatCorrespondsToActiveImage
                texts={texts}
                activeImage={activeImage}
              />
            </MainText>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MainImageWithContent = ({
  children,
  src,
  fontType,
  fontWeight,
  fontSize,
  color,
  activeImage,
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
      <MainImage src={src} activeImage={activeImage} />
    </div>
  );
};
