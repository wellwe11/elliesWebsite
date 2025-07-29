import ControlledImage from "@components/controlledImage/controlledImage";
import classes from "./categories.module.scss";
import { useEffect, useState } from "react";

// each category has a title. I.e. "Stickers, paintings etc"
const AccessoriesTitle = ({ children }) => {
  return (
    <div className={classes.titleContainer}>
      <div className={classes.titleWrapper}>
        <h2 className={classes.title}>{children}</h2>
      </div>
    </div>
  );
};

const AccessoriesContainer = ({ categories }) => {
  const [categoryWidth, setCategoryWdith] = useState(null);
  const categoryKeys = Object.keys(categories);

  useEffect(() => {
    if (!categories) return null;

    const calculatedWidth = 100 / categoryKeys.length;

    setCategoryWdith(calculatedWidth - 2);
  }, [categories]);

  return (
    <div className={classes.accessoriesContainer}>
      {categoryKeys.map((category, index) => (
        <div
          className={classes.accessoriesWrapper}
          key={index}
          style={{ width: `${categoryWidth}%` }}
        >
          <div className={classes.imageWrapper}>
            <div className={classes.image}>
              <ControlledImage
                imageSrc={Object.values(categories[category])}
                imageAlt=""
              />
            </div>
          </div>
          <AccessoriesTitle>{category}</AccessoriesTitle>
        </div>
      ))}
    </div>
  );
};

const Accessories = ({ categories }) => {
  return (
    <section className={classes.accessories}>
      <div className={classes.accessoriesTitleWrapper}>
        <h1 className={classes.title}>Explore categories</h1>
      </div>
      <AccessoriesContainer categories={categories} />
    </section>
  );
};

export default Accessories;
