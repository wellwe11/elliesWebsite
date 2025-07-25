import classes from "./logoWithTextPresentation.module.scss";

import welcomeImageOne from "@assets/welcomeImageOne.jpg";
import logoImage from "@assets/logo.png";

const LogoWithTextPresentation = ({ images }) => {
  const MappedCircleImages = () => {
    return images.map((image, index) => (
      <img
        key={index}
        className={`${classes.image} ${classes[`img${index}`]}`}
        src={image || welcomeImageOne}
      />
    ));
  };

  return (
    <div className={classes.LogoWithTextPresentation}>
      <div className={classes.imagesWrapper}>
        <MappedCircleImages images={images} />
      </div>
      <div className={classes.title}>
        <h1>elisabeth chloé</h1>
      </div>
    </div>
  );
};

export default LogoWithTextPresentation;
