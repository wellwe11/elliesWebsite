import classes from "./mainpageImages.module.scss";

import intersectingRefs from "@functions/intersectingRefs";
import { ImageWithContent } from "@components/imageWithContent/imageWithContentNormal/imageWithContent";

import imageOne from "@assets/exampleImages/blueImageOne.jpg";
import imageTwo from "@assets/exampleImages/blueImageTwo.webp";
import imageThree from "@assets/exampleImages/blueImageThree.webp";

import { useEffect, useRef } from "react";

const someTextOne = "Lorem ipsum dolor sit amet";
const someText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

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
            fontWeight={200}
            color={"black"}
            index={index}
          />
        </div>
      ))}
    </div>
  );
};

export default MainPageImages;
