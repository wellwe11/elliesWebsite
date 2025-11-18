import classes from "./mainPageTopPresentation.module.scss";

import Categories from "./categories/categories.jsx";

const MainPageTopPresentation = ({ mainImage, logoImage }) => {
  return (
    <div className={classes.MainPageTopPresentation}>
      <div className={classes.imageWrapper}>
        <div className={classes.logoContainer}>
          <img className={classes.iconImage} src={logoImage} alt="" />
        </div>
        <div className={classes.mainImageWrapper}>
          <img className={classes.mainImage} src={mainImage} alt={""} />
        </div>
        <div className={classes.logoTextWrapper}>
          <h1 className={classes.text}>art & cards co.</h1>
        </div>
      </div>

      <div className={classes.categoriesWrapper}>
        <Categories text="Explore" />
      </div>
    </div>
  );
};

export default MainPageTopPresentation;
