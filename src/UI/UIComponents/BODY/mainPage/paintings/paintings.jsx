import classes from "./paintings.module.scss";
import { useState } from "react";

import ControlledImage from "@components/controlledImage/controlledImage";
import TextThatCorrespondsToActiveImage from "@components/scrollText/scrollText";
import handleNavigateSmooth from "@functions/handleNavigateSmooth";

const Title = ({ title = "Paintings" }) => {
  return (
    <div className={classes.titleContainer}>
      <div className={classes.titleWrapper}>
        <h1 className={classes.title}>{title}</h1>
      </div>
    </div>
  );
};

const ImagesTexts = ({
  texts,
  textBioTitle = "Currently just a placeholder text",
  activeImage,
}) => {
  return (
    <div className={classes.imagesTextContainer}>
      <div className={classes.imagesTextWrapper}>
        <h3 className={classes.textBioTitle}>{textBioTitle}</h3>

        <p className={classes.textBioBio}>
          <TextThatCorrespondsToActiveImage
            texts={texts}
            activeImage={activeImage}
          />
        </p>
      </div>
    </div>
  );
};

const ImagesContainer = ({ images, setActiveImage }) => {
  const currentSection = Object.entries(images);
  const imagesMap = Object.values(images[currentSection[0][0]]);

  const navigate = handleNavigateSmooth();

  return (
    <div
      className={classes.imagesContainer}
      onClick={() => navigate("/uniqueImage")}
    >
      {imagesMap.map((image, index) => (
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
};

const Paintings = ({ images, texts }) => {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className={classes.paintings}>
      <Title />
      <ImagesContainer images={images} setActiveImage={setActiveImage} />
      <ImagesTexts texts={texts} activeImage={activeImage} />
    </div>
  );
};

export default Paintings;
