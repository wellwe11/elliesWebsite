import { useEffect, useRef, useState } from "react";
import classes from "./uniqueInfoSection.module.scss";
import transitionInAnimation from "@functions/transitionAnimation";

const InfoSectionBio = ({ details, bioRef }) => {
  const bioKeys = Object.keys(details),
    bioValues = Object.values(details).map((e) =>
      Array.isArray(e) ? e.join(", ") : e
    ); // if values are arrays, join them to avoid "RedBlueWhite" to become "Red, Blue, White"

  const mappedBioDetails = bioKeys.map((key, index) => (
    // a list of details for set of images. I.e. colors, width, height etc.
    <div
      className={classes.detailsWrapper}
      key={index}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <p className={classes.detailText}>{key}</p>
      <p className={classes.detailText}>{bioValues[index]}</p>
    </div>
  ));

  // a simple title to indicate where the information about the set is
  const detailsTitle = (
    <div>
      <h3 className={classes.detailsTitle}>DETAILS</h3>
    </div>
  );

  return (
    <div className={classes.uniqeInfoRightBio} ref={bioRef}>
      {detailsTitle}
      {mappedBioDetails}
    </div>
  );
};

const InfoSectionMainImage = ({ activeImage, imageRef }) => {
  return (
    <div className={classes.uniqueInfoLeftImageContainer}>
      <img
        className={classes.uniqueInfoLeftImage}
        src={activeImage}
        alt=""
        ref={imageRef}
      />
    </div>
  );
};

const InfoSectionImages = ({ images, setActiveImage, smallerImagesRef }) => {
  // display all images in the collection, which can be hovered to preview them as bigger
  const smallImagesPreview = images.map((image, index) => (
    <img
      onMouseEnter={() => setActiveImage(index)}
      className={classes.placeholderImage}
      key={index}
      src={image}
      alt=""
    />
  ));

  return (
    <div
      className={classes.uniqueInfoRightImagesWrapper}
      ref={smallerImagesRef}
    >
      {smallImagesPreview}
    </div>
  );
};

const UniqueInfoSection = ({ images, textInfo }) => {
  const [activeImage, setActiveImage] = useState(0);

  const imageRef = useRef(null),
    smallerImagesRef = useRef(null),
    bioRef = useRef(null);

  useEffect(() => {
    transitionInAnimation(imageRef, classes.intersectingImage, false, 40);
    transitionInAnimation(
      smallerImagesRef,
      classes.intersectingInfoRight,
      false,
      30
    );
    transitionInAnimation(bioRef, classes.intersectingBioRight, false, 10);
  }, []);

  const leftSectionWrapper = (
    <div className={classes.uniqueInfoLeft}>
      <InfoSectionMainImage
        activeImage={images[activeImage]}
        imageRef={imageRef}
      />
    </div>
  );

  const rightSectionWrapper = (
    <div className={classes.uniqueInfoRight}>
      <InfoSectionImages
        smallerImagesRef={smallerImagesRef}
        images={images}
        setActiveImage={setActiveImage}
      />
      <InfoSectionBio details={textInfo} bioRef={bioRef} />
    </div>
  );

  return (
    <div className={classes.uniqueInfoSection}>
      {leftSectionWrapper}
      {rightSectionWrapper}
    </div>
  );
};

export default UniqueInfoSection;
