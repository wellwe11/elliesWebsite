import classes from "./uniqueImage.module.scss";

import placeholderImage from "@assets/exampleImages/imageExampleThree.jpg";
import Footer from "../../FOOTER/footer";

import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { useEffect, useRef, useState } from "react";
gsap.registerPlugin(Observer);

const TopImage = () => {
  return (
    <div className={classes.topImage}>
      <img className={classes.topImageImage} src={placeholderImage} alt="" />
    </div>
  );
};

const UniqueTopSection = () => {
  const [transitionIn, setTransitionIn] = useState(false);
  const [transitionTitleIn, setTransitionTitleIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTransitionIn(true);
    }, 800);

    const timerTwo = setTimeout(() => {
      setTransitionTitleIn(true);
    }, 200);

    return () => {
      clearTimeout(timerTwo);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={classes.uniqueTopSection}>
      <div className={classes.uniqueTopLeft}>
        <div className={classes.uniqueLeftTitleWrapper}>
          <div className={classes.uniqueLeftTitle}>
            <h1
              className={`${classes.uniqueLeftTitleText} ${classes.first} ${
                transitionTitleIn ? classes.transitionIn : ""
              }`}
              style={{ color: "black" }}
            >
              Hello,
            </h1>
          </div>
          <div className={classes.uniqueLeftTitle}>
            <h1
              className={`${classes.uniqueLeftTitleText} ${classes.second} ${
                transitionTitleIn ? classes.transitionIn : ""
              }`}
              style={{ color: "black" }}
            >
              Hello 2
            </h1>
          </div>
        </div>
        <div className={classes.bioTextContainer}>
          <div className={classes.bioTextWrapper}>
            <h5
              className={`${classes.bioTitle} ${
                transitionIn ? classes.transitionIn : ""
              }`}
            >
              consectetuer adipiscing elit.
            </h5>
            <h5
              className={`${classes.bioText} ${
                transitionIn ? classes.transitionIn : ""
              }`}
            >
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes.
            </h5>
          </div>
        </div>
      </div>
      <div className={classes.uniqueTopRight}>
        <TopImage />
      </div>
    </div>
  );
};

const UniqueInfoSection = () => {
  return (
    <div className={classes.uniqueInfoSection}>
      <h1>Info Section</h1>
    </div>
  );
};

const UniqueImage = () => {
  return (
    <div className={classes.uniqueImage}>
      <section className={classes.snapStart}>
        <UniqueTopSection />
      </section>
      <section className={classes.snapStart}>
        <UniqueInfoSection />
      </section>
    </div>
  );
};

export default UniqueImage;
