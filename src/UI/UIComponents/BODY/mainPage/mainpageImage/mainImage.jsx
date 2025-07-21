import classes from "./mainImage.module.scss";
import { useEffect, useState } from "react";

import mainDisplayImage from "@assets/imageOnWallPlaceholderRepresentation.png";
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
    transition: `opacity ${
      1 + index * 0.7
    }s cubic-bezier(0, 0, 0.2, 1), filter ${
      1 + index * 0.7
    }s cubic-bezier(0, 0, 0.2, 1)`,
    opacity: displayText ? "1" : "0",
    visibility: displayText ? "visible" : "hidden",
    filter: displayText ? "blur(0px)" : "blur(20px)",
  };

  return <span style={spanStyle}>{children}</span>;
};

const MainImageWrapperText = ({ children }) => {
  const arrowRightElement = (
    <div className={classes.arrowContainer}>
      <ArrowSVG color="white" />
    </div>
  );

  return (
    <div className={classes.mainImageWrapperText}>
      {children.map((t, index) => (
        <div key={index} className="mainImageWrapper">
          <MainImageSpan index={index}>
            {t}
            {arrowRightElement}
          </MainImageSpan>
        </div>
      ))}
    </div>
  );
};

const MainImage = () => {
  // current placeholder-texts. In future will be buttons which direct you to sections on front-page
  const text = ["Imagine", "Explore", "Discover", "Create"];
  return (
    <div className={classes.mainImage}>
      <MainImageWithContent
        src={mainDisplayImage}
        fontSize={"clamp(1rem, 2vw + 1rem, 3rem)"}
        fontWeight={100}
        color="white"
      >
        <MainImageWrapperText>{text}</MainImageWrapperText>
      </MainImageWithContent>
    </div>
  );
};

export default MainImage;
