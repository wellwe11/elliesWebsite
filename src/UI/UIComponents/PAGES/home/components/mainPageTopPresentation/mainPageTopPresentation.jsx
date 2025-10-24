import classes from "./mainPageTopPresentation.module.scss";
import exampleImage from "@assets/categories/bookmarksCategory.avif";

const Categories = () => {
  return (
    <div>
      <h1>Shop</h1>
      <h1>Inspiration</h1>
      <h1>Contact</h1>
    </div>
  );
};

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

      <div className={classes.activeImageContainer}>
        <ActiveImage />
      </div>
    </div>
  );
};

export default MainPageTopPresentation;
