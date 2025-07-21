import classes from "./mainImage.module.scss";
import { useEffect, useState } from "react";

import mainDIsplayImage from "@assets/imageOnWallPlaceholderRepresentation.png";
import ArrowSVG from "@components/SVGS/arrowSVG/arrowSVG";
import { MainImageWithContent } from "@components/imageWithContent/mainImageWithContent/mainImageWithContent";

const MainImage = () => {
  const text = ["Imagine", "Explore", "Discover", "Create"];
  const [displayText, setDisplayText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayText(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={classes.mainImage}>
      <MainImageWithContent
        src={mainDIsplayImage}
        text={
          <div className={classes.mainImageWrapperText}>
            {text.map((t, index) => (
              <span
                key={index}
                style={{
                  transition: `opacity 1.${index}5s ease-out, blur 1.3s ease`,
                  opacity: displayText ? "1" : "0",
                  visibility: displayText ? "visible" : "hidden",
                  filter: displayText ? "blur(0px)" : "blur(5px)",
                }}
              >
                {t}
                <div className={classes.arrowContainer}>
                  <ArrowSVG color="white" />
                </div>
              </span>
            ))}
          </div>
        }
        fontSize={"clamp(1rem, 2vw + 1rem, 3rem)"}
        fontWeight={100}
        color="white"
      />
    </div>
  );
};

export default MainImage;
