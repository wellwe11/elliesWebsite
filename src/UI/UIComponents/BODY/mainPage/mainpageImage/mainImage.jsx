import classes from "./mainImage.module.scss";
import { useEffect, useState } from "react";

import mainDisplayImage from "@assets/imageOnWallPlaceholderRepresentation.png";
import mainDisplayImageTwo from "@assets/imageOnWallPlaceholderRepresentationTwo.png";

import ArrowSVG from "@components/SVGS/arrowSVG/arrowSVG";
import { MainImageWithContent } from "@components/imageWithContent/mainImageWithContent/mainImageWithContent";

const MainImageSpan = ({ children, index }) => {
  const [displayText, setDisplayText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayText(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // smooth opacity transition which isn't entirely synced since its based on parent-elements index which is being mapped
  const spanStyle = {
    transition: `opacity ${1 + index * 0.8}s cubic-bezier(0, 0, 0, 1), filter ${
      0.5 + index * 0.1
    }s cubic-bezier(0, 0, 0, 1)`,
    opacity: displayText ? "1" : "0",
    visibility: displayText ? "visible" : "hidden",
    filter: displayText ? "blur(0px)" : "blur(20px)",
  };

  return (
    <span className={classes.mainImageSpan} style={spanStyle}>
      {children}
    </span>
  );
};

const UnderlineSpan = () => {
  const arrowRightElement = (
    <div className={classes.arrowContainer}>
      <ArrowSVG color="black" />
    </div>
  );

  return (
    <div className={classes.underlineSpanContainer}>
      <div className={classes.underlineSpan}></div>
      {arrowRightElement}
    </div>
  );
};

const MainImageWrapperText = ({ children, setActiveImage }) => {
  return (
    <div className={classes.mainImageWrapperText}>
      {children.map((t, index) => (
        <div
          key={index}
          className="mainImageWrapper"
          onMouseEnter={() => setActiveImage(index)}
        >
          <MainImageSpan index={index}>
            {t}
            <UnderlineSpan />
          </MainImageSpan>
        </div>
      ))}
    </div>
  );
};

const MainImage = () => {
  const [activeImage, setActiveImage] = useState(0);

  // current placeholder-texts. In future will be buttons which direct you to sections on front-page
  const text = ["Prints", "Paintings", "Collections", "Blog"];

  const images = {
    imageOne: mainDisplayImage,
    imageTwo: mainDisplayImageTwo,
  };

  return (
    <div className={classes.mainImage}>
      <MainImageWithContent
        src={Object.values(images)[activeImage]}
        fontSize={"clamp(1rem, 1.5vw + 1rem, 3rem)"}
        fontWeight={100}
        color="black"
        activeImage={activeImage}
      >
        <MainImageWrapperText setActiveImage={setActiveImage}>
          {text}
        </MainImageWrapperText>
      </MainImageWithContent>
    </div>
  );
};

export default MainImage;
