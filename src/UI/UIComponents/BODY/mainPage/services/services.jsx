import classes from "./services.module.scss";
import { useState } from "react";

import ButtonWithUnderlineAndUndertext from "@components/buttonWithUnderlineAndUnderText/buttonWithUnderlineAndUndertext";
import TextThatCorrespondsToActiveImage from "@components/scrollText/scrollText";

// buttons that change the currently displayed set of images
const LeftSection = ({ data, setActiveImage }) => {
  // get collection-names
  const buttonNames = data?.service_collections.map((obj) => obj.name);
  // limit it to 4 sets
  const buttonNamesSpliced = buttonNames.splice(0, 4);

  // a collection of buttons containing the names for each collection (buttonNamesSpliced)
  return (
    <section className={classes.leftSection}>
      {buttonNamesSpliced.map((text, index) => (
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

const RightSection = ({ data, activeImage }) => {
  // each collections set of images
  const collectionImagesShuffle = data?.service_collections.map(
    (obj) => obj.images
  );

  // display a set of 3 images
  // active image represents the current set of images to display
  const currentSetOfImages = collectionImagesShuffle[activeImage];

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

  // the background in which the collections will be previewed on
  const servicesBackgroundImage = data?.backgroundImage;
  // background-image on which the mapped images will be displayed on
  const WallPaperWithPaintings = (
    <div className={classes.imageWrapper}>
      <img className={classes.image} src={servicesBackgroundImage} alt="" />
      {mappedImages}
    </div>
  );

  // each collections title
  const collectionBioTitles = data?.service_collections.map(
    (obj) => obj.bio_title
  );
  // information displayed below image
  // title
  const bioScrollingTitle = (
    <div className={classes.scrollingTextTitle}>
      <h3>
        <TextThatCorrespondsToActiveImage
          texts={collectionBioTitles}
          activeImage={activeImage}
        />
      </h3>
    </div>
  );

  // each collections bio-text
  const collectionBioTexts = data?.service_collections.map(
    (obj) => obj.bio_info
  );
  // bio
  const bioScrollingBio = (
    <div className={classes.scrollingTextBio}>
      <p>
        <TextThatCorrespondsToActiveImage
          texts={collectionBioTexts}
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

const Services = ({ data }) => {
  // current set of images to display. Each number displays a set of 3 images
  const [activeImage, setActiveImage] = useState(0);

  // a collection of buttons containing the names for each collection (buttonNamesSpliced)
  const leftSectionWrapper = (
    <div className={classes.leftSectionWrapper}>
      <LeftSection setActiveImage={setActiveImage} data={data} />
    </div>
  );

  // where images will be displayed
  const rightSectionWrapper = (
    <div className={classes.rightSectionWrapper}>
      <RightSection data={data} activeImage={activeImage} />
    </div>
  );

  return (
    <div className={classes.servicesContainer}>
      {leftSectionWrapper}
      {rightSectionWrapper}
    </div>
  );
};

export default Services;
