import classes from "./mainPageTopPresentation.module.scss";

import LogoWithTextPresentation from "./logoWithTextPresentation/logoWithTextPresentation";
import ControlledImage from "@components/controlledImage/controlledImage";
import { useEffect, useState } from "react";

const MainPageTopPresentation = ({ images, mainImage }) => {
  const [addClass, setAddClass] = useState(false);
  const text = "Welcome".split("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setAddClass(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={classes.MainPageTopPresentation}>
      <LogoWithTextPresentation images={images} />
      {/* <div className={classes.imagesContainer}>
        <img className={classes.imageExample} src={blueImageTwo} alt="" />
        <img className={classes.imageExample} src={blueImageOne} alt="" />
        <img className={classes.imageExample} src={blueImageThree} alt="" />
      </div> */}

      <div className={classes.graciePlaceholderImageWrapper}>
        <div className={classes.mainPageTitleWrapper}>
          {text.map((letter, index) => (
            <h1
              key={index}
              className={`${classes.mainPageTitle} ${
                addClass ? classes.mainPageTitlePopUp : ""
              }`}
              style={{ transition: `all 1.${index}s ease` }}
            >
              {letter}
            </h1>
          ))}
        </div>
        <div className={classes.mainImageWrapper}>
          <img className={classes.mainImage} src={mainImage} alt={""} />
        </div>
      </div>
    </div>
  );
};

export default MainPageTopPresentation;
