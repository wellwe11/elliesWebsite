import classes from "./prints.module.scss";
import { useEffect, useRef, useState } from "react";

import ControlledImage from "@components/controlledImage/controlledImage";
import TextThatCorrespondsToActiveImage from "@components/scrollText/scrollText";
import handleNavigateSmooth from "@functions/handleNavigateSmooth";
import transitionInAnimation from "@functions/transitionAnimation";
import WheelOfManyImages from "@components/wheelOfManyImages/wheelOfManyImages";
import SectionSeperationImage from "@components/sectionSeperationImage/sectionSeperationImage";
import ExploreNewIn from "../../exploreNewIn/exploreNewIn";

const Title = ({ title = "Prints" }) => {
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
  const scrollingText = (
    <p className={classes.textBioBio}>
      <TextThatCorrespondsToActiveImage
        texts={texts}
        activeImage={activeImage}
      />
    </p>
  );

  const bioTitle = <h3 className={classes.textBioTitle}>{textBioTitle}</h3>;

  return (
    <div className={classes.imagesTextContainer}>
      <div className={classes.imagesTextWrapper}>
        {bioTitle}
        {scrollingText}
      </div>
    </div>
  );
};

const ImagesContainer = ({ images, setActiveImage }) => {
  const currentSection = Object.entries(images);
  const navigate = handleNavigateSmooth();

  const imagesValues = Object.values(images[currentSection[0][0]]);

  const imageRef = useRef(null);

  useEffect(() => {
    transitionInAnimation(imageRef, "someclass", true);
  }, [imageRef]);

  const imagesMap = imagesValues.map((image, index) => (
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
      {imagesMap}
    </div>
  );
};

const Prints = ({ images, texts }) => {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className={classes.prints}>
      <Title />
      <ImagesContainer images={images} setActiveImage={setActiveImage} />
      <ImagesTexts texts={texts} activeImage={activeImage} />
      <div className={classes.sectionSeperationImage}>
        <SectionSeperationImage />
      </div>

      <WheelOfManyImages />

      <div className={classes.sectionSeperationImage}>
        <SectionSeperationImage />
      </div>

      <ExploreNewIn />
    </div>
  );
};

export default Prints;
