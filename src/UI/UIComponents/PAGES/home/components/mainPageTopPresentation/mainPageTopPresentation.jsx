import classes from "./mainPageTopPresentation.module.scss";
import exampleImage from "@assets/topPresentationImage.avif";

import Categories from "./categories/categories.jsx";

const ActiveImage = () => {
  return (
    <div className={classes.activeImage}>
      <img src={exampleImage} alt="" />
    </div>
  );
};

const MainPageTopPresentation = ({ mainImage }) => {
  return (
    <div className={classes.MainPageTopPresentation}>
      <div className={classes.imageWrapper}>
        <div className={classes.mainImageWrapper}>
          <img className={classes.mainImage} src={mainImage} alt={""} />
        </div>
      </div>

      <div className={classes.categoriesWrapper}>
        <Categories />
      </div>
      <div className={classes.activeImageWrapper}>
        <ActiveImage />
      </div>
    </div>
  );
};

export default MainPageTopPresentation;
