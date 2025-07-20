import { useNavigate } from "react-router-dom";
import ArrowSVG from "../SVGS/arrowSVG/arrowSVG";
import classes from "./IMAGE.module.scss";
import { useEffect, useState } from "react";

export const ImageWithContent = ({
  src,
  text,
  textType = "h3",
  fontWeight = 300,
  fontSize,
  color = "black",
}) => {
  const FontType = textType;

  const navigate = useNavigate();

  const [imageClicked, setImageClicked] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const handleActiveImage = () => {
    setActiveImage((prev) => (prev + 1 <= images.length ? prev + 1 : 0));
  };

  useEffect(() => {
    if (activeImage === 0) {
      const timer = setTimeout(() => {
        handleActiveImage();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleActiveImage();
    }, 3000);

    return () => clearTimeout(timer);
  }, [activeImage]);

  console.log(activeImage);

  const handleNavigate = () => {
    setImageClicked(true);
    setTimeout(() => {
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          navigate("/imagePage");
        });
      } else {
        navigate("/imagePage");
      }
    }, 500);
  };

  const images = ["image", "image", "image"];

  return (
    <div
      className={`${classes.imageContainer} ${
        imageClicked ? classes.imageClicked : ""
      }`}
      onClick={handleNavigate}
    >
      <div className={classes.imageWithContentWrapper}>
        <img className={classes.imageWithContent} src={""} alt="" />
        {text && (
          <div className={classes.textArea}>
            <FontType
              className={classes.fontType}
              style={{
                fontWeight: fontWeight,
                fontSize: fontSize,
                color: color,
              }}
            >
              {text}
            </FontType>
          </div>
        )}
      </div>
      <div className={classes.smallImagesDisplay}>
        {images.map((image, index) => {
          return (
            <div key={index} className={classes.smallImageWithContentWrapper}>
              <img
                key={index}
                className={classes.smallImageWithContent}
                src={""}
                alt=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const MainImageWithContent = ({
  src,
  text,
  textType = "h3",
  fontWeight = 300,
  fontSize,
  color = "black",
}) => {
  const FontType = textType;

  return (
    <div className={classes.mainImageContainer}>
      {src && <img src={src} alt="" />}

      {text && (
        <div className={classes.textArea}>
          <FontType
            className={classes.fontType}
            style={{ fontWeight: fontWeight, fontSize: fontSize, color: color }}
          >
            {text}
          </FontType>
        </div>
      )}
    </div>
  );
};
