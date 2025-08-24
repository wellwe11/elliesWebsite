import ControlledImage from "@components/controlledImage/controlledImage";
import classes from "./categories.module.scss";
import handleNavigateSmooth from "@functions/handleNavigateSmooth";

// each category has a title. I.e. "Stickers, paintings etc"
const CategoryTitle = ({ title }) => {
  const firstCapitalTitle = title[0].toUpperCase() + title.slice(1);

  const categoryTitle = <h2 className={classes.title}>{firstCapitalTitle}</h2>;

  const categoryExploreTextWithUnderline = (
    <div className={classes.exploreWrapper}>
      <h4 className={classes.subTitle}>Explore</h4>
      <div className={classes.underline}>
        <div className={classes.underlineDot} />
      </div>
    </div>
  );

  return (
    <div className={classes.titleContainer}>
      <div className={classes.titleWrapper}>
        {categoryTitle}
        {categoryExploreTextWithUnderline}
      </div>
    </div>
  );
};

const CategoryContainer = ({ categories }) => {
  // category names
  const categoryKeys = Object.keys(categories);

  const navigate = handleNavigateSmooth();

  // Make sure container is dynamic size
  const calculatedCategoryStyle = {
    width: `${100 / categoryKeys.length}%`,
  };

  return (
    <div className={classes.categoriesContainer}>
      {categoryKeys.map((category, index) => (
        <div
          className={classes.categoriesWrapper}
          key={index}
          style={calculatedCategoryStyle}
          onClick={() => navigate(`./gallery/${category}`)}
        >
          <div className={classes.imageWrapper}>
            <img
              className={classes.image}
              src={Object.values(categories[category])}
              alt=""
            />
          </div>
          <CategoryTitle title={category} />
        </div>
      ))}
    </div>
  );
};

const Categories = ({ categories }) => {
  return (
    <section className={classes.categories}>
      <CategoryContainer categories={categories} />
    </section>
  );
};

export default Categories;
