import React, { useMemo, useState } from "react";
import classes from "./wheelOfManyImages.module.scss";

import NavigationButtons from "./components/navigationButtons/navigationButtons.jsx";
import QuickView from "./components/quickView/quickView.jsx";

const Images = React.memo(({ data, canQuickView }) => {
  // mapped objects using their 'representive-image'

  const buttonLimit = data.length; // the limit of marginLeft the wheel can go

  // clicking left or right decreases or increases marginLeft by 1. This is then translate to marginLeft * 10 %. So 2 = 20%.
  const [marginLeft, setMarginLeft] = useState(0);

  // Save previous marginLeft.
  // Transition does not apply if marginLeft is 0. Once we reach the end of the mapped array of images, marginLeft resets to 0.
  // But when you navigate between marginLeft: -1 and 1, transition is also lost. Because of this,
  // we add a safeguard to enforce that transition can only be lost if previous number was 9 or -9.
  const [prevMarginLeft, setPrevMarginLeft] = useState(0);

  // transition applied/removed & translateX control.
  const marginLeftStyle = {
    transform: `translateX(${(100 / buttonLimit) * marginLeft}%)`,
    transition: `${
      marginLeft === 0 &&
      (prevMarginLeft === -buttonLimit + 1 ||
        prevMarginLeft === buttonLimit - 1)
        ? ""
        : "transform 0.5s ease"
    }`,
  };

  // array containing images
  const mappedImages = useMemo(
    () =>
      data?.map((obj, index) => {
        const {
            image,
            _embedded: {
              details: { price, set, type },
            },
            id,
          } = obj,
          { _embedded } = obj;
        const restImages = _embedded.restImages[1];
        const productTypes = _embedded.details.type;

        return (
          <div key={index} className={classes.imageWrapper}>
            <QuickView
              canQuickView={canQuickView}
              src={image}
              secondSrc={restImages}
              productType={productTypes}
              productId={id}
            />
            <div className={classes.bioContainer}>
              <p className={`${classes.bio} ${classes.type}`}>
                {type} - <span>{set}</span>
              </p>

              <p className={`${classes.bio} ${classes.price}`}>{price} €</p>
            </div>
          </div>
        );
      }),
    [data]
  );

  // All images are collectively returned 3 times in the return-statement to visually look like you can scroll forever
  const mappedImagesThreeTimes = (
    <>
      <div className={`${classes.imagesWrapper}`} style={marginLeftStyle}>
        {mappedImages}
      </div>

      {/* imagesContainer (mappedImages container) is justify-content center. Therefor, this mappedImages is the "main-set" of images which are dispalyed */}
      <div className={`${classes.imagesWrapper}`} style={marginLeftStyle}>
        {mappedImages}
      </div>

      <div className={`${classes.imagesWrapper}`} style={marginLeftStyle}>
        {mappedImages}
      </div>
    </>
  );

  return (
    <div className={classes.imagesContainer}>
      <NavigationButtons
        buttonLimit={buttonLimit}
        setMarginLeft={setMarginLeft}
        setPrevMarginLeft={setPrevMarginLeft}
      />
      {mappedImagesThreeTimes}
    </div>
  );
});

// Exception to rules. Needs map to allow for isolated logic which will only be applied to this document
const WheelOfManyImages = ({
  data,
  canQuickView, // canQuickView enables quickView button. If not includes, no button appears. Having this false makes displayImage and activeImageSrc none-active
}) => {
  return (
    <div className={classes.WheelOfManyImages}>
      <Images data={data} canQuickView={canQuickView} />
    </div>
  );
};

export default WheelOfManyImages;
