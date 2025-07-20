import { useNavigate } from "react-router-dom";
import ArrowSVG from "../SVGS/arrowSVG/arrowSVG";
import classes from "./IMAGE.module.scss";
import { useEffect, useState } from "react";

export const ImageWithContent = ({
  images,
  designedBy,
  bio,
  textType = "h3",
  fontWeight = 300,
  fontSize,
  color = "black",
}) => {
  const FontType = textType;

  const navigate = useNavigate();

  const [imageClicked, setImageClicked] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [imageIsHovering, setImageIsHovering] = useState(false);

  const handleActiveImage = () => {
    if (!imageIsHovering) {
      setActiveImage((prev) =>
        prev + 1 <= Object.keys(images)?.length - 1 ? prev + 1 : 0
      );
    }
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
    if (imageIsHovering) return;

    const timer = setTimeout(() => {
      handleActiveImage();
    }, 3000);

    return () => clearTimeout(timer);
  }, [activeImage, imageIsHovering]);

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

  const texts = ["this is text one", "this is text two", "this is text three"];

  return (
    <div
      className={`${classes.imageContainer} ${
        imageClicked ? classes.imageClicked : ""
      }`}
      onMouseEnter={() => setImageIsHovering(true)}
      onMouseLeave={() => setImageIsHovering(false)}
    >
      <div className={classes.imageWithContentWrapper} onClick={handleNavigate}>
        {Object.values(images).map((image, index) => (
          <img
            key={index}
            className={classes.imageWithContent}
            alt=""
            src={image}
            style={{
              opacity: index === activeImage ? "1" : 0,
            }}
          />
        ))}

        <div className={classes.textArea}>
          <FontType
            className={classes.fontType}
            style={{
              fontWeight: fontWeight,
              fontSize: fontSize,
              color: color,
            }}
          >
            <span className={classes.fontTypeSpan}>{designedBy}</span>
          </FontType>
          <FontType className={classes.fontTypeBio}>
            {texts.map((text, index) => (
              <span
                style={{
                  top:
                    activeImage > index
                      ? "30px"
                      : activeImage < index
                      ? "-30px"
                      : "0px",
                  opacity: activeImage === index ? "1" : "0",
                }}
                className={classes.fontTypeSpanBio}
                key={index}
              >
                {text}
              </span>
            ))}
          </FontType>
        </div>
      </div>
      <div className={classes.smallImagesDisplay}>
        {Object.values(images).map((image, index) => {
          return (
            <div
              key={index}
              className={classes.smallImageWithContentWrapper}
              onClick={() => setActiveImage(index)}
              style={{
                outline: activeImage === index ? "1px solid black" : "",
              }}
            >
              <img
                src={image}
                key={index}
                className={classes.smallImageWithContent}
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
