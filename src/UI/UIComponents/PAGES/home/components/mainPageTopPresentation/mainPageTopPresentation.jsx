import classes from "./mainPageTopPresentation.module.scss";

import LogoWithTextPresentation from "./logoWithTextPresentation/logoWithTextPresentation.jsx";

const MainPageTopPresentation = ({ images, mainImage }) => {
  // a small animation which is displayed once you load the front-page
  const LogoPresentation = <LogoWithTextPresentation images={images} />;

  // title inside of image that says something like "welcome"
  const mainPageTitle = (
    <div className={classes.mainPageTitleWrapper}>
      <h1 className={classes.mainPageTitle}>Welcome</h1>
    </div>
  );

  // a background-image which is displayed on top of the front-page
  const mainPageImage = (
    <div className={classes.mainImageWrapper}>
      <img className={classes.mainImage} src={mainImage} alt={""} />
    </div>
  );

  return (
    <div className={classes.MainPageTopPresentation}>
      {LogoPresentation}

      <div className={classes.graciePlaceholderImageWrapper}>
        {mainPageTitle}
        {mainPageImage}
      </div>
    </div>
  );
};

export default MainPageTopPresentation;
