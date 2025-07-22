import classes from "./mainpageImages.module.scss";

import intersectingRefs from "@functions/intersectingRefs";
import { ImageWithContent } from "@components/imageWithContent/imageWithContentNormal/imageWithContent";

import imageOne from "@assets/exampleImages/blueImageOne.png";
import imageTwo from "@assets/exampleImages/blueImageTwo.png";
import imageThree from "@assets/exampleImages/blueImageThree.png";

import { useEffect, useRef } from "react";

const someTextOne = "Lorem ipsum dolor sit amet";
const someText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
const images = {
  Prints: {
    imageOne: imageOne,
    imageTwo: imageTwo,
    imageThree: imageThree,
  },
  Paintings: {
    imageOne: imageOne,
    imageTwo: imageTwo,
    imageThree: imageThree,
  },
};

const MainPageImages = () => {
  const imageRefs = useRef([]);
  const textRefs = useRef([]);

  useEffect(() => {
    intersectingRefs(imageRefs, classes.imageAnimationOne);
    intersectingRefs(textRefs, classes.hoverFont);
  }, [imageRefs]);

  const imagesEntries = Object.entries(images);

  const mappedImagesEntries = imagesEntries.map(([key, obj], index) => (
    <div
      className={classes.mainPageImage}
      ref={(el) => (imageRefs.current[index] = el)}
      key={key}
    >
      <ImageWithContent
        images={obj}
        designedBy={someTextOne}
        bio={someText}
        fontWeight={200}
        color={"black"}
        index={index}
        title={key}
      />
    </div>
  ));

  return <div className={classes.mainPageImages}>{mappedImagesEntries}</div>;
};

export default MainPageImages;
