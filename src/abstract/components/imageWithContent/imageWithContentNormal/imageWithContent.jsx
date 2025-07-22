import classes from "./imageWithContent.module.scss";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import checkForValidFont from "@functions/checkForValidFont";
import TextThatCorrespondsToActiveImage from "@components/scrollText/scrollText";

const VisitTitle = ({}) => {};

export const TextArea = ({
  fontSize,
  fontWeight = 300,
  fontType,
  color = "black",
  activeImage,
  designedBy,
  bio,
}) => {
  // temp. placeholder text
  const texts = ["this is text one", "this is text two", "this is text three"];

  if (!texts) return <h1>Loading...</h1>;

  // determine what type of font it will be
  const FontType = checkForValidFont(fontType);

  return (
    <div className={classes.textArea}>
      <FontType
        className={classes.fontType}
        style={{
          fontWeight,
          fontSize,
          color,
        }}
      >
        <span className={classes.fontTypeSpan}>{designedBy}</span>
      </FontType>
      <FontType className={classes.fontTypeBio}>
        <TextThatCorrespondsToActiveImage
          texts={bio || texts}
          activeImage={activeImage}
        />
      </FontType>
    </div>
  );
};

const SmallImagesWithContent = ({ images, setActiveImage }) => {
  const smallImage = (image, index) => {
    return (
      <div
        onMouseEnter={() => setActiveImage(index)}
        className={classes.smallImageWithContentWrapper}
      >
        {/**add image to src to add the actual image */}
        <img src={image} className={classes.smallImageWithContent} alt="" />
      </div>
    );
  };

  const mappedImages = Object.values(images).map((image, index) =>
    smallImage(image, index)
  );

  return <div className={classes.smallImagesDisplay}>{mappedImages}</div>;
};

export const ImageWithContent = ({
  images,
  designedBy,
  bio,
  fontType,
  fontWeight,
  fontSize,
  color,
  title,
}) => {
  const [activeImage, setActiveImage] = useState(0);

  const navigate = useNavigate();

  // to navigate to specific ImageWithContent page
  const handleNavigate = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        navigate("/uniqueImage");
      });
    } else {
      navigate("/uniqueImage");
    }
  };

  return (
    <div className={`${classes.imageContainer}`}>
      <h1>{title || "Title"}</h1>
      <div onClick={handleNavigate}>
        <SmallImagesWithContent
          images={images}
          setActiveImage={setActiveImage}
        />
      </div>
      <TextArea
        fontType={fontType}
        fontWeight={fontWeight}
        fontSize={fontSize}
        color={color}
        activeImage={activeImage}
        designedBy={designedBy}
      />
    </div>
  );
};
