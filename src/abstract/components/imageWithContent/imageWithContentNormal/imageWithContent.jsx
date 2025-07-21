import classes from "./imageWithContent.module.scss";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import checkForValidFont from "../../../functions/checkForValidFont";

const CurrentlyDisplayedImage = ({ images, imageClicked, activeImage }) => {
  if (!images) {
    return <h1>...loading</h1>;
  }

  return images.map((image, index) => (
    <img
      key={index}
      className={`${classes.imageWithContent} ${
        imageClicked ? classes.imageClicked : ""
      }`}
      alt=""
      src={image}
      style={{
        opacity: index === activeImage ? "1" : 0,
      }}
    />
  ));
};

const TextArea = ({
  fontSize,
  fontWeight = 300,
  fontType,
  color = "black",
  activeImage,
  designedBy,
}) => {
  // temp. placeholder text
  const texts = ["this is text one", "this is text two", "this is text three"];

  if (!texts) return <h1>Loading...</h1>;

  // determine what type of font it will be
  const FontType = checkForValidFont(fontType);

  // bio-text, placed below image, which displays text related to current active image
  const TextThatCorrespondsToActiveImage = texts.map((text, index) => (
    <span
      style={{
        top:
          activeImage > index ? "30px" : activeImage < index ? "-30px" : "0px",
        opacity: activeImage === index ? "1" : "0",
      }}
      className={classes.fontTypeSpanBio}
      key={index}
    >
      {text}
    </span>
  ));

  return (
    <div className={classes.textArea}>
      <FontType
        className={classes.fontType}
        style={{
          fontWeight,
          fontSize,
          color,
        }}
      >
        <span className={classes.fontTypeSpan}>{designedBy}</span>
      </FontType>
      <FontType className={classes.fontTypeBio}>
        {texts.length > 0 && TextThatCorrespondsToActiveImage}
      </FontType>
    </div>
  );
};

const SmallImagesWithContent = ({
  indexIsEven,
  images,
  setActiveImage,
  activeImage,
}) => {
  const blackOutline = "1px solid black";
  const grayOutline = "1px solid rgba(171, 171, 171, 0.365)";

  const smallImages = images.map((image, index) => (
    <div
      key={index}
      className={classes.smallImageWithContentWrapper}
      onClick={() => setActiveImage(index)}
      style={{
        outline: activeImage === index ? blackOutline : grayOutline,
      }}
    >
      <img
        src={image}
        key={index}
        className={classes.smallImageWithContent}
        alt=""
      />
    </div>
  ));

  return (
    <div className={classes.smallImagesDisplay} style={{ order: indexIsEven }}>
      {smallImages}
    </div>
  );
};

const ImageWithContentWrapper = ({
  indexIsUnEven,
  images,
  activeImage,
  fontType,
  fontWeight,
  fontSize,
  color,
  designedBy,
}) => {
  const navigate = useNavigate();

  // change currently dispalyed big image
  const [imageClicked, setImageClicked] = useState(false);

  // to navigate to specific ImageWithContent page
  const handleNavigate = () => {
    setImageClicked(true);
    setTimeout(() => {
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          navigate("/imagePage");
        });
      } else {
        navigate("/imagePage");
      }
    }, 500);
  };

  return (
    <div
      className={classes.imageWithContentWrapper}
      onClick={handleNavigate}
      style={{ order: indexIsUnEven }}
    >
      <CurrentlyDisplayedImage
        images={images}
        imageClicked={imageClicked}
        activeImage={activeImage}
      />

      <TextArea
        fontType={fontType}
        fontWeight={fontWeight}
        fontSize={fontSize}
        color={color}
        activeImage={activeImage}
        designedBy={designedBy}
      />
    </div>
  );
};

export const ImageWithContent = ({
  images,
  designedBy,
  bio,
  fontType,
  fontWeight,
  fontSize,
  color,
  index,
}) => {
  const [activeImage, setActiveImage] = useState(0);

  // Determine if smaller images should be on the left or the right side of the ImageWithContent
  // because we always want them facing inwards
  // if index is even (2, 4, 6 etc), order is 1
  const indexIsEven = index % 2 === 0 ? 2 : 1;
  // and for ImageWithContent, we do the opposite:
  // if index is uneven (1, 3, 5 etc), order is 1
  const indexIsUnEven = index % 2 === 0 ? 1 : 2;

  return (
    <div className={`${classes.imageContainer}`}>
      <ImageWithContentWrapper
        indexIsUnEven={indexIsUnEven}
        images={images}
        activeImage={activeImage}
        fontType={fontType}
        fontWeight={fontWeight}
        fontSize={fontSize}
        color={color}
        designedBy={designedBy}
      />

      <SmallImagesWithContent
        indexIsEven={indexIsEven}
        images={images}
        activeImage={activeImage}
        setActiveImage={setActiveImage}
      />
    </div>
  );
};
