import { useCallback, useEffect, useRef, useState } from "react";
import classes from "./sectionSeperationImage.module.scss";
import image from "@assets/welcomeImage.jpg";

const useParallexEffect = (speed) => {
  const [offsetY, setOffsetY] = useState(0);
  const elementRef = useRef();
  const containerRef = useRef();

  const handleScroll = useCallback(() => {
    if (elementRef.current) {
      const elementHeight = elementRef.current.height;
      const distanceToTopScreen =
        elementRef.current.getBoundingClientRect().top;

      if (distanceToTopScreen > 0 && distanceToTopScreen < elementHeight) {
        const addDistance = distanceToTopScreen * speed * -1;
        setOffsetY(addDistance);
      }
    }
  }, [speed]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { offsetY, elementRef, containerRef };
};

const SectionSeperationImage = ({ withImage = false }) => {
  const { offsetY, elementRef, containerRef } = useParallexEffect(0.03),
    imageStyle = {
      objectFit: "cover",
      transform: `translateY(${offsetY}px)`,
      transition: "transform 0.1s linear",
    };

  return (
    <div className={classes.sectionSeperationImageWrapper} ref={containerRef}>
      {withImage ? ( // either you can apply an image or create an empty section to seperate elements
        <img
          ref={elementRef}
          className={`${classes.globalImageSettings} ${classes.image}`}
          src={image}
          alt=""
          style={imageStyle}
        />
      ) : (
        <div className={classes.globalImageSettings} />
      )}
    </div>
  );
};

export default SectionSeperationImage;
