import { useState } from "react";
import classes from "./setOfImagesWithText.module.scss";
import handleNavigateSmooth from "@functions/handleNavigateSmooth";
import ControlledImage from "@components/controlledImage/controlledImage";
import TextThatCorrespondsToActiveImage from "@components/scrollText/scrollText";

const SetOfimagesWithText = ({
  images,
  texts,
  textBioTitle = "Currently just a placeholder text",
}) => {
  // changes scrolling text (imagesTexts) below imagesContainer
  const [activeImage, setActiveImage] = useState(0);

  const navigate = handleNavigateSmooth();

  // Mapped images which are a set of 3 images, part of the same collection. Is displayed on front-page
  const imagesMap = (
    <div
      className={classes.imagesContainer}
      onClick={() => navigate("/uniqueImage")}
    >
      {images.map((image, index) => (
        <div
          key={index}
          className={classes.imageWrapper}
          onMouseEnter={() => setActiveImage(index)}
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
  const bioTitle = <h3 className={classes.textBioTitle}>{textBioTitle}</h3>;

  // Each individual image has a text related to it which is changed depending on which image is hovered
  const scrollingText = (
    <p className={classes.textBioBio}>
      <TextThatCorrespondsToActiveImage
        texts={texts}
        activeImage={activeImage}
      />
    </p>
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
