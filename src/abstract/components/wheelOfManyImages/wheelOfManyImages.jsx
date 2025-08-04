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

const exampleImages = [
  exampleImage,
  exampleImageTwo,
  exampleImageThree,
  exampleImageTwo,
  exampleImage,
  exampleImageTwo,
  exampleImageThree,
  exampleImage,
  exampleImageTwo,
];

const QuickViewImage = ({
  setDisplayImage,
  activeImageSrc,
  setActiveImageSrc,
}) => {
  const [viewDescription, setViewDescription] = useState(true);

  return (
    <div className={classes.quickViewImage}>
      {/* white background-image that differs pop-up from other elements */}
      <div
        className={classes.quickViewBackground}
        onClick={() => {
          setActiveImageSrc(null);
          setDisplayImage(false);
        }}
      />

      <div className={classes.quickViewImageContainer}>
        <div className={classes.activeImageWrapper}>
          <img className={classes.activeImage} src={activeImageSrc} alt="" />
        </div>

        <div className={classes.infoSection}>
          <div className={classes.info}>
            <h1>Title</h1>
          </div>

          <div className={classes.price}>
            <h3>20$</h3>
          </div>

          <div className={classes.allImagesExamples}>
            {exampleImages.map((image, index) => (
              <img
                key={index}
                className={classes.imageExample}
                src={image}
                alt=""
                onMouseEnter={() => setActiveImageSrc(image)}
              />
            ))}
          </div>
          <div className={classes.productDescription}>
            <button
              className={classes.buttonDescriptionButton}
              onClick={() => setViewDescription(!viewDescription)}
            >
              <h3 className={classes.buttonDescriptionButtonText}>
                Description
              </h3>
            </button>
            <div
              className={`${classes.descriptionWrapper} ${
                viewDescription ? classes.open : classes.closed
              }`}
            >
              <p
                className={`${classes.descriptionText} ${
                  viewDescription ? classes.open : classes.closed
                }`}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <button className={classes.viewProductButton}>
              <h3 className={classes.buttonText}>Explore item</h3>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickViewButton = ({ setDisplayImage }) => {
  return (
    <button
      className={classes.quickViewButton}
      onClick={() => setDisplayImage(true)}
    >
      <h4 className={classes.quickViewText}>Quick view</h4>
    </button>
  );
};

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
    <div className={`${classes.navigationButtonWrapper} ${classes.left}`}>
      <button className={classes.navigationButton} onClick={handleLeftClick}>
        <h3 className={classes.buttonArrow}>←</h3>
      </button>
    </div>
  );

  // navigate right
  const rightClickButton = (
    <div className={`${classes.navigationButtonWrapper} ${classes.right}`}>
      <button className={classes.navigationButton} onClick={handleRightClick}>
        <h3 className={classes.buttonArrow}>→</h3>
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

const Images = ({ setDisplayImage, setActiveImageSrc }) => {
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

  // array containing images. They are applied 3 times in the return-statement to visually look like you can scroll forever
  const mappedImages = (
    <div className={`${classes.imagesWrapper}`} style={marginLeftStyle}>
      {images.map((image, index) => (
        <div key={index} className={classes.imageWrapper}>
          <img className={classes.image} src={image} alt="" />
          <div
            className={classes.quickViewButtonWrapper}
            onClick={() => setActiveImageSrc(image)}
          >
            <QuickViewButton setDisplayImage={setDisplayImage} />
          </div>
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
const WheelOfManyImages = ({ title = "Placeholder title" }) => {
  // boolean if quick-view has been clicked
  const [displayImage, setDisplayImage] = useState(false);

  // sorce for which quick-view-image will have if displayImage is true
  const [activeImageSrc, setActiveImageSrc] = useState(null);

  useEffect(() => {
    // if displayImage is true, remove scroll

    console.log(displayImage);
    document.body.classList.toggle("body--no-scroll", displayImage);
  }, [displayImage]);

  return (
    <div className={classes.WheelOfManyImages}>
      <div>
        <h1>{title}</h1>
      </div>
      <Images
        displayImage={displayImage}
        setDisplayImage={setDisplayImage}
        setActiveImageSrc={setActiveImageSrc}
      />

      {displayImage && (
        <QuickViewImage
          setDisplayImage={setDisplayImage}
          activeImageSrc={activeImageSrc}
          setActiveImageSrc={setActiveImageSrc}
        />
      )}
    </div>
  );
};

export default WheelOfManyImages;
