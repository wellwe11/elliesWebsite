import classes from "./mainpageImages.module.scss";

import intersectingRefs from "@functions/intersectingRefs";
import { ImageWithContent } from "@components/imageWithContent/imageWithContentNormal/imageWithContent";

import { useEffect, useRef } from "react";

const MainPageImages = ({ images, bio, designedBy }) => {
  const imageRefs = useRef([]);
  const textRefs = useRef([]);

  useEffect(() => {
    intersectingRefs(imageRefs, classes.imageAnimationOne);
    intersectingRefs(textRefs, classes.hoverFont);
  }, [imageRefs]);

  const MainPageImages = () => {
    const imagesEntries = Object.entries(images);
    return imagesEntries.map(([key, obj], index) => (
      <div
        className={classes.mainPageImage}
        ref={(el) => (imageRefs.current[index] = el)}
        key={index}
      >
        <ImageWithContent
          images={obj}
          designedBy={designedBy}
          bio={bio}
          fontWeight={200}
          color={"black"}
          index={index}
          title={key}
        />
      </div>
    ));
  };

  return (
    <div className={classes.mainPageImages}>
      <MainPageImages />
    </div>
  );
};

export default MainPageImages;
