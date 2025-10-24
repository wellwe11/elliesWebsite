import classes from "./mainPageTopPresentation.module.scss";
import exampleImage from "@assets/categories/bookmarksCategory.avif";

const Categories = () => {
  const categories = ["Gallery", "Inspiration", "Contact"];

  return (
    <div className={classes.categories}>
      {categories.map((category, index) => (
        <div key={category} className={classes.textWrapper}>
          <button className={classes.button}>
            <div className={classes.buttonBackgroundWrapper}>
              <div className={classes.buttonBackgroundFadeIn} />
              <div className={classes.buttonBackgroundFadeOut} />
            </div>
            <h1
              className={classes.textOne}
              style={{ animationDelay: `1.${index + 1}s` }}
            >
              {category}
            </h1>

            <h1 className={classes.textTwo}>{category}</h1>
          </button>
        </div>
      ))}
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
