import ControlledImage from "@components/controlledImage/controlledImage";
import classes from "./categories.module.scss";

// each category has a title. I.e. "Stickers, paintings etc"
const CategoryTitle = ({ children }) => {
  return (
    <div className={classes.titleContainer}>
      <div className={classes.titleWrapper}>
        <h2 className={classes.title}>{children}</h2>
      </div>
    </div>
  );
};

const CategoryContainer = ({ categories }) => {
  // category names
  const categoryKeys = Object.keys(categories);

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
        >
          <div className={classes.imageWrapper}>
            <div className={classes.image}>
              <ControlledImage
                imageSrc={Object.values(categories[category])}
                imageAlt=""
              />
            </div>
          </div>
          <CategoryTitle>{category}</CategoryTitle>
        </div>
      ))}
    </div>
  );
};

const Categories = ({ categories }) => {
  return (
    <section className={classes.categories}>
      <div className={classes.categoriesTitleWrapper}>
        <h1 className={classes.title}>Explore categories</h1>
      </div>
      <CategoryContainer categories={categories} />
    </section>
  );
};

export default Categories;
