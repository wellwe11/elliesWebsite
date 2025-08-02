import { useEffect, useRef, useState } from "react";
import classes from "./wheelOfManyImages.module.scss";

import exampleImage from "@assets/exampleImages/imageExampleThree.jpg";
import exampleImageTwo from "@assets/exampleImages/imageExampleTwo.jpg";
import exampleImageThree from "@assets/exampleImages/imageExampleOne.jpg";

const images = [
  exampleImage,
  exampleImageTwo,
  exampleImageThree,
  exampleImageTwo,
  exampleImage,
  exampleImageTwo,
  exampleImageThree,
  exampleImage,
  exampleImageTwo,
  exampleImageThree,
  exampleImageTwo,
  exampleImage,
  exampleImageTwo,
  exampleImageThree,
  exampleImage,
  exampleImageTwo,
  exampleImageThree,
  exampleImageTwo,
  exampleImage,
  exampleImageTwo,
  exampleImageThree,
]; // 21

const NavigationButtons = ({ setMarginLeft, setPrevMarginLeft }) => {
  const [canNavigate, setCanNavigate] = useState(true);

  // const imagesLength = images.length;
  const handleRightClick = () => {
    if (canNavigate) {
      setCanNavigate(false);

      setMarginLeft((prev) => {
        setPrevMarginLeft(prev);
        if (prev - 1 > -10) {
          return prev - 1;
        } else {
          setTimeout(() => {
            setMarginLeft(0);
          }, 500);
          return prev - 1;
        }
      });
    }
  };

  const handleLeftClick = () => {
    if (canNavigate) {
      setCanNavigate(false);

      setMarginLeft((prev) => {
        setPrevMarginLeft(prev);
        if (prev + 1 < 10) {
          return prev + 1;
        } else {
          setTimeout(() => {
            setMarginLeft(0);
          }, 500);
          return prev + 1;
        }
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCanNavigate(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [canNavigate]);

  const leftClickButton = (
    <div className={`${classes.navigationButtonWrapper} ${classes.right}`}>
      <button className={classes.navigationButton} onClick={handleLeftClick}>
        <h3>←</h3>
      </button>
    </div>
  );

  const rightClickButton = (
    <div className={`${classes.navigationButtonWrapper} ${classes.left}`}>
      <button className={classes.navigationButton} onClick={handleRightClick}>
        <h3>→</h3>
      </button>
    </div>
  );

  return (
    <div className={classes.navigationButtonsContainer}>
      {leftClickButton}
      {rightClickButton}
    </div>
  );
};

const Images = ({}) => {
  const [marginLeft, setMarginLeft] = useState(0);
  const [prevMarginLeft, setPrevMarginLeft] = useState(0);

  const marginLeftStyle = {
    transform: `translateX(${marginLeft}0%)`,
    transition: `${
      marginLeft === 0 && (prevMarginLeft === 9 || prevMarginLeft === 9)
        ? ""
        : "transform 0.5s ease"
    }`,
  };

  console.log(marginLeft, prevMarginLeft);
  return (
    <div className={classes.imagesContainer}>
      <NavigationButtons
        setMarginLeft={setMarginLeft}
        setPrevMarginLeft={setPrevMarginLeft}
      />
      <div
        className={`${classes.imagesWrapper}`}
        style={{ ...marginLeftStyle, borderLeft: "10px solid black" }}
      >
        {images.map((image, index) => (
          <div key={index} className={classes.imageWrapper}>
            <img className={classes.image} src={image} alt="" />
          </div>
        ))}
      </div>

      {/* Extended set of images to allow 'infinite' scrolling. Is placed after the current set of scroll-images */}
      <div
        className={`${classes.imagesWrapper}`}
        style={{ ...marginLeftStyle, borderLeft: "10px solid black" }}
      >
        {images.map((image, index) => (
          <div key={index} className={classes.imageWrapper}>
            <img className={classes.image} src={image} alt="" />
          </div>
        ))}
      </div>
      <div
        className={`${classes.imagesWrapper}`}
        style={{ ...marginLeftStyle, borderLeft: "10px solid black" }}
      >
        {images.map((image, index) => (
          <div key={index} className={classes.imageWrapper}>
            <img className={classes.image} src={image} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

// Exception to rules. Needs map to allow for isolated logic which will only be applied to this document
const WheelOfManyImages = () => {
  return (
    <div className={classes.WheelOfManyImages}>
      <Images />
    </div>
  );
};

export default WheelOfManyImages;
