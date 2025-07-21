import classes from "./MAINPAGE.module.scss";

import { useEffect, useRef, useState } from "react";
import intersectingRefs from "../../../../abstract/functions/intersectingRefs";

import mainDIsplayImage from "../../../../assets/imageOnWallPlaceholderRepresentation.png";
import ArrowSVG from "../../../../abstract/components/SVGS/arrowSVG/arrowSVG";
import { ImageWithContent } from "../../../../abstract/components/imageWithContent/imageWithContentNormal/imageWithContent";
import { MainImageWithContent } from "../../../../abstract/components/imageWithContent/mainImageWithContent/mainImageWithContent";

const someTextOne = "Lorem ipsum dolor sit amet";
const someText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

import imageOne from "../../../../assets/exampleImages/blueImageOne.jpg";
import imageTwo from "../../../../assets/exampleImages/blueImageTwo.webp";
import imageThree from "../../../../assets/exampleImages/blueImageThree.webp";

const MainPageImages = () => {
  const imageRefs = useRef([]);
  const textRefs = useRef([]);
  const images = {
    images: {
      imageOne: imageOne,
      imageTwo: imageTwo,
      imageThree: imageThree,
    },
    imagesTwo: {
      imageOne: imageOne,
      imageTwo: imageTwo,
      imageThree: imageThree,
    },
    imagesThree: {
      imageOne: imageOne,
      imageTwo: imageTwo,
      imageThree: imageThree,
    },
  };

  console.log(Object.entries(images));

  useEffect(() => {
    intersectingRefs(imageRefs, classes.imageAnimationOne);
    intersectingRefs(textRefs, classes.hoverFont);
  }, [imageRefs]);

  return (
    <div className={classes.mainPageImages}>
      {Object.entries(images).map(([key, obj], index) => (
        <div
          className={classes.mainPageImage}
          ref={(el) => (imageRefs.current[index] = el)}
          key={key}
        >
          <ImageWithContent
            images={Object.values(obj)}
            designedBy={someTextOne}
            bio={someText}
            textType={"h3"}
            fontWeight={200}
            color={"black"}
            index={index}
          />
        </div>
      ))}
    </div>
  );
};

const MainImage = () => {
  const text = ["Imagine", "Explore", "Discover", "Create"];
  const [displayText, setDisplayText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayText(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={classes.mainImage}>
      <MainImageWithContent
        src={mainDIsplayImage}
        text={
          <div className={classes.mainImageWrapperText}>
            {text.map((t, index) => (
              <span
                key={index}
                style={{
                  transition: `opacity 1.${index}5s ease-out, blur 1.3s ease`,
                  opacity: displayText ? "1" : "0",
                  visibility: displayText ? "visible" : "hidden",
                  filter: displayText ? "blur(0px)" : "blur(5px)",
                }}
              >
                {t}
                <div className={classes.arrowContainer}>
                  <ArrowSVG color="white" />
                </div>
              </span>
            ))}
          </div>
        }
        textType="h1"
        fontSize={"clamp(1rem, 2vw + 1rem, 3rem)"}
        fontWeight={100}
        color="white"
      />
    </div>
  );
};

const MainPage = () => {
  return (
    <div>
      <MainImage />
      <MainPageImages />
    </div>
  );
};

export default MainPage;
