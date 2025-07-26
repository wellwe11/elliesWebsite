import { useEffect, useRef, useState } from "react";
import classes from "./uniqueInfoSection.module.scss";
import transitionInAnimation from "@functions/transitionAnimation";

const InfoSectionBio = ({ details, bioRef }) => {
  const bioTitle = Object.keys(details);
  const bioKeys = Object.keys(details[bioTitle]);
  const bioValues = Object.values(details[bioTitle]);

  return (
    <div className={classes.unqieInfoRightBio} ref={bioRef}>
      <div>
        <h1 className={classes.detailsTitle}>{bioTitle}</h1>
      </div>

      {bioKeys.map((key, index) => (
        <div className={classes.detailsWrapper} key={index}>
          <h5 className={classes.detailText}>{key}</h5>
          <h5 className={classes.detailText}>{bioValues[index]}</h5>
        </div>
      ))}
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
  return (
    <div
      className={classes.uniqueInfoRightImagesWrapper}
      ref={smallerImagesRef}
    >
      {images.map((image, index) => (
        <img
          onMouseEnter={() => setActiveImage(index)}
          className={classes.placeholderImage}
          key={index}
          src={image}
          alt=""
        />
      ))}
    </div>
  );
};

const UniqueInfoSection = ({ images, textInfo }) => {
  const [activeImage, setActiveImage] = useState(0);
  const imageArray = [images.imageOne, images.imageTwo, images.imageThree];

  const imageRef = useRef(null);
  const smallerImagesRef = useRef(null);
  const bioRef = useRef(null);

  useEffect(() => {
    transitionInAnimation(imageRef, classes.intersectingImage);
    transitionInAnimation(smallerImagesRef, classes.intersectingSmallerImages);
    transitionInAnimation(bioRef, classes.intersectingSmallerImages);
  }, []);

  return (
    <div className={classes.uniqueInfoSection}>
      <div className={classes.uniqueInfoLeft}>
        <InfoSectionMainImage
          activeImage={imageArray[activeImage]}
          imageRef={imageRef}
        />
      </div>
      <div className={classes.uniqueInfoRight}>
        <InfoSectionImages
          smallerImagesRef={smallerImagesRef}
          images={imageArray}
          setActiveImage={setActiveImage}
        />
        <InfoSectionBio details={textInfo} bioRef={bioRef} />
      </div>
    </div>
  );
};

export default UniqueInfoSection;
