import classes from "./mainPageTopPresentation.module.scss";

import Categories from "./categories/categories.jsx";

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
    </div>
  );
};

export default MainPageTopPresentation;
