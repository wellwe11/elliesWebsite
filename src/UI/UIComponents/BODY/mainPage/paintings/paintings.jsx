import classes from "./paintings.module.scss";
import { useEffect, useRef, useState } from "react";

import ControlledImage from "@components/controlledImage/controlledImage";
import TextThatCorrespondsToActiveImage from "@components/scrollText/scrollText";
import handleNavigateSmooth from "@functions/handleNavigateSmooth";
import transitionInAnimation from "@functions/transitionAnimation";
import WheelOfManyImages from "@components/wheelOfManyImages/wheelOfManyImages";

const Title = ({ title = "Paintings" }) => {
  const titleWrapper = (
    <div className={classes.titleWrapper}>
      <h1 className={classes.title}>{title}</h1>
    </div>
  );

  return <div className={classes.titleContainer}>{titleWrapper}</div>;
};

const ImagesTexts = ({
  texts,
  textBioTitle = "Currently just a placeholder text",
  activeImage,
}) => {
  // The collection of paintings will have a title/name to describe them
  const imagesTitle = <h3 className={classes.textBioTitle}>{textBioTitle}</h3>;

  // paintings will have a quick bio about each image which changes depending on what image you hover
  const scrollingImagesText = (
    <p className={classes.textBioBio}>
      <TextThatCorrespondsToActiveImage
        texts={texts}
        activeImage={activeImage}
      />
    </p>
  );

  return (
    <div className={classes.imagesTextContainer}>
      <div className={classes.imagesTextWrapper}>
        {imagesTitle}
        {scrollingImagesText}
      </div>
    </div>
  );
};

const ImagesContainer = ({ images, setActiveImage }) => {
  const currentSection = Object.entries(images);
  const imagesMap = Object.values(images[currentSection[0][0]]);
  const imageRef = useRef(null);

  const navigate = handleNavigateSmooth();

  useEffect(() => {
    transitionInAnimation(imageRef, "someclass", true);
  }, [imageRef]);

  const mappedImages = imagesMap.map((image, index) => (
    <div
      key={index}
      className={classes.imageWrapper}
      onMouseEnter={() => setActiveImage(index)}
    >
      <ControlledImage imageSrc={image} imageAlt={`Print product ${index}`} />
    </div>
  ));

  return (
    <div
      className={classes.imagesContainer}
      onClick={() => navigate("/uniqueImage")}
      ref={imageRef}
    >
      {mappedImages}
    </div>
  );
};

const Paintings = ({ images, texts }) => {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className={classes.paintings}>
      <Title />
      <ImagesContainer images={images} setActiveImage={setActiveImage} />
      <ImagesTexts texts={texts} activeImage={activeImage} />
      <WheelOfManyImages />
    </div>
  );
};

export default Paintings;
