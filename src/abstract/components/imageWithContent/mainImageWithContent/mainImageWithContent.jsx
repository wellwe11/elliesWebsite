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

const MainImage = ({ activeImage, images }) => {
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

  if (!images) return;

  return (
    <div className={classes.mainImage}>
      <div className={classes.mainImageImgContainer}>
        {Object.values(images).map((image, index) => (
          <img
            src={image}
            alt=""
            className={classes.mainImageImg}
            style={{
              opacity: index === activeImage ? "1" : "0",
              transform: index === activeImage ? "scale(1)" : "scale(1.05)",
              filter: index === activeImage ? "blur(0px)" : "blur(1px)",

              transition:
                index !== activeImage
                  ? "transform 0.3s ease-out, opacity 0.7s ease, filter 0.6s ease"
                  : "opacity 0.22s ease",
              zIndex: activeImage === index ? 1 : 2,
            }}
          />
        ))}
      </div>
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
  images,
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
      <MainImage images={images} activeImage={activeImage} />
    </div>
  );
};
