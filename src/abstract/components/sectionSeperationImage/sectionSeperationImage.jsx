import { useEffect, useState } from "react";
import classes from "./sectionSeperationImage.module.scss";
import image from "@assets/welcomeImage.jpg";

const useParallexEffect = (speed = 0.2) => {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(Math.round((window.pageYOffset * speed) / 100));
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return offsetY;
};

const SectionSeperationImage = ({ withImage = false }) => {
  const parallaxOffset = useParallexEffect(0.3);

  const imageStyle = {
    backgroundImage: `url('${image}')`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",

    transform: `translateY(${parallaxOffset}px)`,

    transition: "transform 0.1s linear",
  };

  return (
    <div className={classes.sectionSeperationImageWrapper}>
      {withImage ? ( // either you can apply an image or create an empty section to seperate elements
        <div
          className={`${classes.image} ${classes.globalImageSettings}`}
          style={imageStyle}
        />
      ) : (
        <div className={classes.globalImageSettings} />
      )}
    </div>
  );
};

export default SectionSeperationImage;
