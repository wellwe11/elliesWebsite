import { useEffect, useState } from "react";
import classes from "./wheelOfManyImages.module.scss";

import {
  QuickViewButton,
  QuickViewImageContainer,
} from "./quickView/quickView";
import NavigationButtons from "./navigationButtons/navigationButtons";
import ControlledImage from "@components/controlledImage/controlledImage";

const Images = ({
  images,
  setDisplayImage,
  setActiveImageSrc,
  canQuickView,
}) => {
  // image that is displayed once you click quick-view button

  // clicking left or right decreases or increases marginLeft by 1. This is then translate to marginLeft * 10 %. So 2 = 20%.
  const [marginLeft, setMarginLeft] = useState(0);

  // Save previous marginLeft.
  // Transition does not apply if marginLeft is 0. Once we reach the end of the mapped array of images, marginLeft resets to 0.
  // But when you navigate between marginLeft: -1 and 1, transition is also lost. Because of this,
  // we add a safeguard to enforce that transition can only be lost if previous number was 9 or -9.
  const [prevMarginLeft, setPrevMarginLeft] = useState(0);

  // transition applied/removed & translateX control.
  const marginLeftStyle = {
    transform: `translateX(${marginLeft}0%)`,
    transition: `${
      marginLeft === 0 && (prevMarginLeft === -9 || prevMarginLeft === 9)
        ? ""
        : "transform 0.5s ease"
    }`,
  };

  // array containing images
  const mappedImages = (
    <div className={`${classes.imagesWrapper}`} style={marginLeftStyle}>
      {images?.map((image, index) => (
        <div key={index} className={classes.imageWrapper}>
          <ControlledImage imageSrc={image} />
          <div
            className={classes.quickViewButtonWrapper}
            onClick={() => setActiveImageSrc(image)}
          >
            {canQuickView && (
              <QuickViewButton setDisplayImage={setDisplayImage} />
            )}
          </div>
        </div>
      ))}
    </div>
  );

  // All images are collectively returned 3 times in the return-statement to visually look like you can scroll forever
  const mappedImagesThreeTimes = (
    <>
      {mappedImages}

      {/* imagesContainer (mappedImages container) is justify-content center. Therefor, this mappedImages is the "main-set" of images which are dispalyed */}
      {mappedImages}

      {mappedImages}
    </>
  );

  return (
    <div className={classes.imagesContainer}>
      <NavigationButtons
        setMarginLeft={setMarginLeft}
        setPrevMarginLeft={setPrevMarginLeft}
      />
      {mappedImagesThreeTimes}
    </div>
  );
};

// Exception to rules. Needs map to allow for isolated logic which will only be applied to this document
const WheelOfManyImages = ({
  images,
  quickViewImages,
  canQuickView, // canQuickView enables quickView button. If not includes, no button appears. Having this false makes displayImage and activeImageSrc none-active
}) => {
  // boolean if quick-view has been clicked
  // if true, display clicked image
  const [displayImage, setDisplayImage] = useState(false);

  // source for which quick-view-image will be if displayImage is true
  // if dispalyImage === true, setActiveImageSrc to image and display it
  const [activeImageSrc, setActiveImageSrc] = useState(null);

  useEffect(() => {
    // if displayImage is true, remove scroll
    document.body.classList.toggle("body--no-scroll", displayImage);
  }, [displayImage]);

  return (
    <div className={classes.WheelOfManyImages}>
      <Images
        images={images}
        setDisplayImage={setDisplayImage}
        setActiveImageSrc={setActiveImageSrc}
        canQuickView={canQuickView}
      />

      {displayImage && (
        <QuickViewImageContainer
          setDisplayImage={setDisplayImage}
          activeImageSrc={activeImageSrc}
          setActiveImageSrc={setActiveImageSrc}
          quickViewImages={quickViewImages}
        />
      )}
    </div>
  );
};

export default WheelOfManyImages;
