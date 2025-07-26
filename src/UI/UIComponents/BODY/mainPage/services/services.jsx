import classes from "./services.module.scss";
import { useEffect, useState } from "react";

import wallImage from "@assets/wall.jpg";

import ButtonWithUnderlineAndUndertext from "@components/buttonWithUnderlineAndUnderText/buttonWithUnderlineAndUndertext";
import TextThatCorrespondsToActiveImage from "@components/scrollText/scrollText";

// buttons that change the currently displayed set of images
const LeftSection = ({ children, setActiveImage }) => {
  return (
    <section className={classes.leftSection}>
      <div className={classes.buttonsWrapper}>
        <ButtonWithUnderlineAndUndertext
          fontSize={35}
          setActiveImage={setActiveImage}
        >
          {children}
        </ButtonWithUnderlineAndUndertext>
      </div>
    </section>
  );
};

const RightSection = ({ imagesShuffle, textsTitles, activeImage, texts }) => {
  // display a set of 3 images
  const currentSetOfImages = imagesShuffle[activeImage];

  const mappedImages = currentSetOfImages.map((image, index) => (
    <div
      key={index}
      className={`${classes.paintingWrapper} ${classes[`image${index}`]}`}
    >
      <img className={classes.paintImage} src={image} alt="" />
    </div>
  ));

  // complete image
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

  return (
    <div className={classes.servicesContainer}>
      <LeftSection setActiveImage={setActiveImage}>{buttonNames}</LeftSection>
      <RightSection
        texts={texts}
        textsTitles={textsTitles}
        imagesShuffle={imagesShuffle}
        activeImage={activeImage}
      />
    </div>
  );
};

export default Services;
