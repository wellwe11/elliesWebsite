import { useEffect, useState } from "react";
import classes from "./wheelOfManyImages.module.scss";

import exampleImage from "@assets/exampleImages/imageExampleThree.jpg";
import exampleImageTwo from "@assets/exampleImages/imageExampleTwo.jpg";
import exampleImageThree from "@assets/exampleImages/imageExampleOne.jpg";

// placeholder images for now
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

  // Moves images right
  const handleRightClick = () => {
    // forces delay between navigation
    if (canNavigate) {
      setCanNavigate(false);

      setMarginLeft((prev) => {
        setPrevMarginLeft(prev);
        if (prev - 1 > -10) {
          // if prev is within boundaries
          return prev - 1;
        } else {
          // returns array to start after a transition delay - adds illusion that carousel is infinite
          setTimeout(() => {
            setMarginLeft(0);
          }, 500);
          return prev - 1;
        }
      });
    }
  };

  // Moves images left
  const handleLeftClick = () => {
    // forces delay between navigation
    if (canNavigate) {
      setCanNavigate(false);

      setMarginLeft((prev) => {
        setPrevMarginLeft(prev);
        if (prev + 1 < 10) {
          // if prev is within boundaries
          return prev + 1;
        } else {
          // returns array to start after a transition delay - adds illusion that carousel is infinite
          setTimeout(() => {
            setMarginLeft(0);
          }, 500);
          return prev + 1;
        }
      });
    }
  };

  // acts as a delay to allow for a transition to be fully applied
  // this works as a 'safeguard' preventing spam-scrolling, so that
  // the images appears as infinite
  useEffect(() => {
    const timer = setTimeout(() => {
      setCanNavigate(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [canNavigate]);

  // navigate left
  const leftClickButton = (
    <div className={`${classes.navigationButtonWrapper} ${classes.right}`}>
      <button className={classes.navigationButton} onClick={handleLeftClick}>
        <h3>←</h3>
      </button>
    </div>
  );

  // navigate right
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

  // array containing images. They are applied 3 times in the return-statement to visually look like you can scroll forever
  const mappedImages = (
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
  );

  return (
    <div className={classes.imagesContainer}>
      <NavigationButtons
        setMarginLeft={setMarginLeft}
        setPrevMarginLeft={setPrevMarginLeft}
      />
      {mappedImages}

      {/* Extended set of images to allow 'infinite' scrolling. Is placed after the current set of scroll-images */}
      {mappedImages}
      {mappedImages}
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
