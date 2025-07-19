import classes from "./MAINPAGE.module.scss";
import ImageWithContent from "../../../../abstract/components/imageWithContent/IMAGE";
import { useEffect, useRef, useState } from "react";
import intersectingRefs from "../../../../abstract/functions/intersectingRefs";

import mainDIsplayImage from "../../../../assets/imageOnWallPlaceholderRepresentation.png";

const MainPageImages = () => {
  const imageRefs = useRef([]);
  const images = ["image", "image", "image", "image", "image"];

  useEffect(() => {
    intersectingRefs(imageRefs, classes.imageAnimationOne);
  }, [imageRefs]);

  return (
    <div className={classes.mainPageImages}>
      {images.map((image, index) => (
        <div
          className={classes.mainPageImage}
          ref={(el) => (imageRefs.current[index] = el)}
          key={index}
        >
          <ImageWithContent />
        </div>
      ))}
    </div>
  );
};

const MainImage = () => {
  const text = ["Image", "Explore", "Discover", "Create"];
  const [displayText, setDisplayText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayText(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={classes.mainImage}>
      <ImageWithContent
        src={mainDIsplayImage}
        text={
          <div className={classes.mainImageWrapperText}>
            {text.map((t, index) => (
              <span
                style={{
                  transition: `opacity 1.${index}5s ease-out, blur 1.3s ease`,
                  opacity: displayText ? "1" : "0",
                  visibility: displayText ? "visible" : "hidden",
                  filter: displayText ? "blur(0px)" : "blur(5px)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        }
        textType="h1"
        fontSize={"50px"}
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
