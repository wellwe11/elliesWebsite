import classes from "./services.module.scss";

import { useState } from "react";

import ButtonWithUnderlineAndUndertext from "@components/buttonWithUnderlineAndUnderText/buttonWithUnderlineAndUndertext";
import TextThatCorrespondsToActiveImage from "@components/scrollText/scrollText";

// buttons that change the currently displayed set of images
const LeftSection = ({ data, setActiveImage }) => {
  const buttonNames = data?.service_collections.map((obj) => obj.name), // get collection-names
    buttonNamesSpliced = buttonNames.splice(0, 4); // limit it to 4 sets

  return (
    // a collection of buttons containing the names for each collection (buttonNamesSpliced)
    <section className={classes.leftSection}>
      {buttonNamesSpliced.map((text, index) => (
        <div
          className={classes.buttonsWrapper}
          key={index}
          onMouseEnter={() => setActiveImage(index)}
        >
          <ButtonWithUnderlineAndUndertext
            index={index}
            fontType={"h3"}
            fontSize={"2.3vw"}
          >
            {text}
          </ButtonWithUnderlineAndUndertext>
        </div>
      ))}
    </section>
  );
};

const RightSection = ({ data, activeImage }) => {
  // each collections set of images
  const collectionImagesShuffle = data?.service_collections.map(
      (obj) => obj.images
    ),
    currentSetOfImages = collectionImagesShuffle[activeImage], //  display a set of 3 images - active image represents the current set of images to display
    servicesBackgroundImage = data?.backgroundImage, // the background in which the collections will be previewed on
    collectionBioTitles = data?.service_collections.map(
      // each collections title
      (obj) => obj.bio_title
    ),
    collectionBioTexts = data?.service_collections.map((obj) => obj.bio_info); // each collections bio-text

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

  const WallPaperWithPaintings = (
    // background-image on which the mapped images will be displayed on
    <div className={classes.imageWrapper}>
      <img className={classes.image} src={servicesBackgroundImage} alt="" />
      {mappedImages}
    </div>
  );

  const bioScrollingTitle = (
    // information displayed below image title
    <div className={classes.scrollingTextTitle}>
      <TextThatCorrespondsToActiveImage
        fontSize="h6"
        fontWeight={300}
        texts={collectionBioTitles}
        activeImage={activeImage}
      />
    </div>
  );

  const bioScrollingBio = (
    // bio
    <div className={classes.scrollingTextBio}>
      <TextThatCorrespondsToActiveImage
        texts={collectionBioTexts}
        activeImage={activeImage}
      />
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

const Services = ({ data }) => {
  // current set of images to display. Each number displays a set of 3 images
  const [activeImage, setActiveImage] = useState(0);

  const leftSectionWrapper = (
    // a collection of buttons containing the names for each collection (buttonNamesSpliced)
    <div className={classes.leftSectionWrapper}>
      <LeftSection setActiveImage={setActiveImage} data={data} />
    </div>
  );

  const rightSectionWrapper = (
    // where images will be displayed
    <div className={classes.rightSectionWrapper}>
      <RightSection data={data} activeImage={activeImage} />
    </div>
  );

  return (
    <div className={classes.servicesContainer}>
      <div className={classes.background} />
      <div className={classes.serviceContent}>
        {leftSectionWrapper}
        {rightSectionWrapper}
      </div>
    </div>
  );
};

export default Services;
