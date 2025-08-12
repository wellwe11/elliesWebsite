import classes from "./logoWithTextPresentation.module.scss";

import welcomeImageOne from "@assets/welcomeImageOne.jpg";

const LogoWithTextPresentation = ({ images }) => {
  // small animated circles that pop up on page-load
  const MappedCircleImages = images.map((image, index) => (
    <img
      key={index}
      className={`${classes.image} ${classes[`img${index}`]}`}
      src={image || welcomeImageOne}
    />
  ));

  // Title that is displayed together with mappedCircleImages
  const logoTitle = <h1>elisabeth chloé</h1>;

  return (
    <div className={classes.LogoWithTextPresentation}>
      <div className={classes.imagesWrapper}>{MappedCircleImages}</div>
      <div className={classes.title}>{logoTitle}</div>
    </div>
  );
};

export default LogoWithTextPresentation;
