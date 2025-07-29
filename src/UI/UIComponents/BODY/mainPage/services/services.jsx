import classes from "./services.module.scss";
import { useEffect, useState } from "react";

import wallImage from "@assets/wall.png";

import ButtonWithUnderlineAndUndertext from "@components/buttonWithUnderlineAndUnderText/buttonWithUnderlineAndUndertext";
import TextThatCorrespondsToActiveImage from "@components/scrollText/scrollText";

// buttons that change the currently displayed set of images
const LeftSection = ({ children, setActiveImage }) => {
  return (
    <section className={classes.leftSection}>
      {children.map((text, index) => (
        <div
          className={classes.buttonsWrapper}
          key={index}
          onMouseEnter={() => setActiveImage(index)}
        >
          <ButtonWithUnderlineAndUndertext index={index} fontSize={"30px"}>
            {text}
          </ButtonWithUnderlineAndUndertext>
        </div>
      ))}
    </section>
  );
};

const RightSection = ({ imagesShuffle, textsTitles, activeImage, texts }) => {
  // display a set of 3 images
  // active image represents the current set of images to display
  const currentSetOfImages = imagesShuffle[activeImage];

  const mappedImages = (
    <div className={classes.paintingContainer}>
      {currentSetOfImages.map((image, index) => (
        <div
          key={index}
          className={`${classes.paintingWrapper} ${classes[`image${index}`]}`}
        >
          <img className={classes.paintImage} src={image} alt="" />
        </div>
      ))}
    </div>
  );

  // background-image on which the mapped images will be displayed on
  const WallPaperWithPaintings = (
    <div className={classes.imageWrapper}>
      <img className={classes.image} src={wallImage} alt="" />
      {mappedImages}
    </div>
  );

  // information displayed below image
  const bioScrollingTitle = (
    <div className={classes.scrollingTextTitle}>
      <h3>
        <TextThatCorrespondsToActiveImage
          texts={textsTitles}
          activeImage={activeImage}
        />
      </h3>
    </div>
  );

  const bioScrollingBio = (
    <div className={classes.scrollingTextBio}>
      <p>
        <TextThatCorrespondsToActiveImage
          texts={texts}
          activeImage={activeImage}
        />
      </p>
    </div>
  );

  const scrollingTextContainer = (
    <div className={classes.rightScrollingText}>
      {bioScrollingTitle}
      {bioScrollingBio}
    </div>
  );

  return (
    <section className={classes.rightSection}>
      {WallPaperWithPaintings}
      {scrollingTextContainer}
    </section>
  );
};

const Services = ({ texts, textsTitles, buttonNames, imagesShuffle }) => {
  const [activeImage, setActiveImage] = useState(0);

  console.log(activeImage);
  return (
    <div className={classes.servicesContainer}>
      <div className={classes.leftSectionWrapper}>
        <LeftSection setActiveImage={setActiveImage}>{buttonNames}</LeftSection>
      </div>
      <div className={classes.rightSectionWrapper}>
        <RightSection
          texts={texts}
          textsTitles={textsTitles}
          imagesShuffle={imagesShuffle}
          activeImage={activeImage}
        />
      </div>
    </div>
  );
};

export default Services;
