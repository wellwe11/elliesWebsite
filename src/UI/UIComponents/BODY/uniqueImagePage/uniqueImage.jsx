import classes from "./uniqueImage.module.scss";

import placeholderImageOne from "@assets/exampleImages/imageExampleOne.jpg";
import placeholderImageTwo from "@assets/exampleImages/imageExampleTwo.jpg";
import placeholderImageThree from "@assets/exampleImages/imageExampleThree.jpg";

import { useEffect, useRef, useState } from "react";
import intersectingRefs from "@functions/intersectingRefs";

const TopImage = ({ src }) => {
  return (
    <div className={classes.topImage}>
      <img
        className={classes.topImageImage}
        src={src || placeholderImageThree}
        alt=""
      />
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
  const imageRef = useRef(null);
  const smallerImagesRef = useRef(null);

  useEffect(() => {
    const transitionInAnimation = (ref, className) => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(className);
        } else {
          entry.target.classList.remove(className);
        }
      });

      const element = ref.current;

      if (element) {
        observer.observe(element);
      }

      return () => {
        if (element) {
          observer.unobserve(element);
        }
        observer.disconnect();
      };
    };

    transitionInAnimation(imageRef, classes.intersectingImage);
    transitionInAnimation(smallerImagesRef, classes.intersectingSmallerImages);
  }, []);

  return (
    <div className={classes.uniqueInfoSection}>
      <div className={classes.uniqueInfoLeft}>
        <div className={classes.uniqueInfoLeftImageContainer}>
          <img
            className={classes.uniqueInfoLeftImage}
            src={placeholderImageTwo}
            alt=""
            ref={imageRef}
          />
        </div>
      </div>
      <div className={classes.uniqueInfoRight}>
        <div
          className={classes.uniqueInfoRightImagesWrapper}
          ref={smallerImagesRef}
        >
          <img
            className={classes.placeholderImage}
            src={placeholderImageOne}
            alt=""
          />
          <img
            className={classes.placeholderImage}
            src={placeholderImageTwo}
            alt=""
          />
          <img
            className={classes.placeholderImage}
            src={placeholderImageThree}
            alt=""
          />
        </div>
        <div className={classes.unqieInfoRightBio}>
          <div>
            <h1 className={classes.detailsTitle}>DETAILS</h1>
          </div>
          <div className={classes.detailsWrapper}>
            <h5 className={classes.detailText}>Colors</h5>
            <h5 className={classes.detailText}>Red, blue, white</h5>
          </div>
          <div className={classes.detailsWrapper}>
            <h5 className={classes.detailText}>Height</h5>
            <h5 className={classes.detailText}>35cm</h5>
          </div>
          <div className={classes.detailsWrapper}>
            <h5 className={classes.detailText}>Width</h5>
            <h5 className={classes.detailText}>20cm</h5>
          </div>
          <div className={classes.detailsWrapper}>
            <h5 className={classes.detailText}>Type</h5>
            <h5 className={classes.detailText}>Print</h5>
          </div>
          <div className={classes.detailsWrapper}>
            <h5 className={classes.detailText}>Amount</h5>
            <h5 className={classes.detailText}>3</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

const UniqueImage = () => {
  return (
    <div className={classes.uniqueImage}>
      <section className={`${classes.snapStart} ${classes.first}`}>
        <UniqueTopSection />
      </section>
      <section className={classes.snapStart}>
        <UniqueInfoSection />
      </section>
    </div>
  );
};

export default UniqueImage;
