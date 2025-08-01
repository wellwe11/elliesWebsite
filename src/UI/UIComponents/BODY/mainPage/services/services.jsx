import classes from "./services.module.scss";
import { useState } from "react";

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

const RightSection = ({
  imagesShuffle,
  textsTitles,
  activeImage,
  texts,
  wallImage,
}) => {
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
  // title
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

  // bio
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

const Services = ({
  texts,
  textsTitles,
  buttonNames,
  imagesShuffle,
  wallImage,
}) => {
  // current set of images to display. Each number displays a set of 3 images
  const [activeImage, setActiveImage] = useState(0);

  const leftSectionWrapper = (
    <div className={classes.leftSectionWrapper}>
      <LeftSection setActiveImage={setActiveImage}>{buttonNames}</LeftSection>
    </div>
  );

  const rightSectionWrapper = (
    <div className={classes.rightSectionWrapper}>
      <RightSection
        texts={texts}
        textsTitles={textsTitles}
        imagesShuffle={imagesShuffle}
        activeImage={activeImage}
        wallImage={wallImage}
      />
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
