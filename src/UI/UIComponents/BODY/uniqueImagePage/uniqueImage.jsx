import classes from "./uniqueImage.module.scss";

import placeholderImage from "@assets/exampleImages/imageExampleThree.jpg";
import Footer from "../../FOOTER/footer";

const TopImage = () => {
  return (
    <div className={classes.topImage}>
      {/* <img className={classes.topImageImage} src={placeholderImage} alt="" /> */}
    </div>
  );
};

const UniqueTopSection = () => {
  return (
    <div className={classes.uniqueTopSection}>
      <div className={classes.uniqueTopLeft}>
        <h1 style={{ color: "black" }}>Hello, this is unique image</h1>
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
      <div className={classes.snapStart}>
        <UniqueTopSection />
      </div>
      <div className={classes.snapStart}>
        <UniqueInfoSection />
      </div>
      <div className={classes.snapEnd}>
        <Footer />
      </div>
    </div>
  );
};

export default UniqueImage;
