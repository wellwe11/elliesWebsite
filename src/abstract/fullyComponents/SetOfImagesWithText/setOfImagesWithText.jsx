import { useState } from "react";
import classes from "./setOfImagesWithText.module.scss";
import ControlledImage from "@components/controlledImage/controlledImage";
import TextThatCorrespondsToActiveImage from "@components/scrollText/scrollText";

const SetOfimagesWithText = ({
  images,
  texts,
  textBioTitle = "Currently just a placeholder text",
}) => {
  // changes scrolling text (imagesTexts) below imagesContainer
  const [activeImage, setActiveImage] = useState(0);

  // Mapped images which are a set of an object in most cases, part of the same collection. Is displayed on front-page
  const imagesMap = (
    <div className={classes.imagesContainer}>
      {images.map((image, index) => (
        <div
          key={index}
          className={classes.imageWrapper}
          onMouseEnter={() => setActiveImage(index)}
          style={{ width: `calc(${100 / images.length - 3}%)` }}
        >
          <ControlledImage
            imageSrc={image}
            imageAlt={`Print product ${index}`}
          />
        </div>
      ))}
    </div>
  );

  // the set has a name which is displayed as a title
  const bioTitle = <h5 className={classes.textBioTitle}>{textBioTitle}</h5>;

  // Each individual image has a text related to it which is changed depending on which image is hovered
  const scrollingText = (
    <div className={classes.textBioBio}>
      <TextThatCorrespondsToActiveImage
        texts={texts}
        activeImage={activeImage}
      />
    </div>
  );

  return (
    <div className={classes.setOfImagesWithText}>
      {imagesMap}

      <div className={classes.imagesTextWrapper}>
        {bioTitle}
        {scrollingText}
      </div>
    </div>
  );
};

export default SetOfimagesWithText;
