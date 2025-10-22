import classes from "./exploreNewIn.module.scss";
import tempImage from "@assets/euroSection.webp";

const ExploreNewIn = () => {
  return (
    <div className={classes.exploreNewIn}>
      <div className={classes.sideWrapper}>
        <div className={classes.left}>
          <div className={classes.imageContainer}>
            <img className={classes.image} src={tempImage} alt="" />
          </div>
        </div>
        <div className={classes.right}>
          <div className={classes.textBackgroundImage}>
            <div className={classes.textContainer}>
              <div className={classes.textWrapper}>
                <h1 className={classes.text}>
                  Introduction to the current section
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreNewIn;
