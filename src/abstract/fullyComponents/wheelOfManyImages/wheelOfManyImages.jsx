import { useContext, useState } from "react";
import classes from "./wheelOfManyImages.module.scss";

import { QuickViewImageContainer } from "./quickView/quickView";
import QuickViewButton from "@components/whiteButtonCenterText/WHITEBUTTONCENTERTEXT";
import NavigationButtons from "./navigationButtons/navigationButtons";
import ControlledImage from "@components/controlledImage/controlledImage";
import UniqueImageContext from "../../../UI/UIComponents/BODY/uniqueImageContext";

const Images = ({ data, canQuickView }) => {
  // mapped objects using their 'representive-image'
  const wheelImages = data?.map((obj) => obj.image);

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

  const { setUniqueImage } = useContext(UniqueImageContext);

  // array containing images
  const mappedImages = (
    <div className={`${classes.imagesWrapper}`} style={marginLeftStyle}>
      {wheelImages?.map((image, index) => (
        <div key={index} className={classes.imageWrapper}>
          <ControlledImage imageSrc={image} />
          {canQuickView && (
            <div
              className={classes.quickViewButtonWrapper}
              onClick={() => setUniqueImage(data[index])}
            >
              <QuickViewButton text={"Quick view"} />
            </div>
          )}
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
  data,
  canQuickView, // canQuickView enables quickView button. If not includes, no button appears. Having this false makes displayImage and activeImageSrc none-active
}) => {
  const { uniqueImage, setUniqueImage } = useContext(UniqueImageContext);

  return (
    <div className={classes.WheelOfManyImages}>
      <Images data={data} canQuickView={canQuickView} />

      {uniqueImage && (
        <QuickViewImageContainer onClick={() => setUniqueImage(null)} />
      )}
    </div>
  );
};

export default WheelOfManyImages;
