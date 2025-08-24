import classes from "./exploreNewIn.module.scss";
import tempImage from "@assets/euroSection.webp";

const ExploreNewIn = () => {
  const textWrapper = (
    //  background-image is in css: exploreNewIn.module.scss
    <div className={classes.textBackgroundImage}>
      <div className={classes.textContainer}>
        <div className={classes.textWrapper}>
          <h1 className={classes.text}>Introduction to the current section</h1>
        </div>
      </div>
    </div>
  );

  const imageWrapper = (
    <div className={classes.imageContainer}>
      <img className={classes.image} src={tempImage} alt="" />
    </div>
  );

  return (
    <div className={classes.exploreNewIn}>
      <div className={classes.sideWrapper}>
        <div className={classes.left}>{imageWrapper}</div>
        <div className={classes.right}>{textWrapper}</div>
      </div>
    </div>
  );
};

export default ExploreNewIn;
