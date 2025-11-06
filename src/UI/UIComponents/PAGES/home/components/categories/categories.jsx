import classes from "./categories.module.scss";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import fadeInClasses from "@classes/fadeInOnLoad.module.scss";
import ControlledImage from "@components/controlledImage/controlledImage";
import intersecter from "../../../../../../abstract/functions/interSection.js";

// each category has a title. I.e. "Stickers, paintings etc"
const CategoryTitle = ({ title }) => {
  const firstCapitalTitle = title[0].toUpperCase() + title.slice(1);

  const categoryTitle = <h5 className={classes.title}>{firstCapitalTitle}</h5>;

  const categoryExploreTextWithUnderline = (
    <div className={classes.exploreWrapper}>
      <h6 className={classes.subTitle}>Explore</h6>
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
  const categoriesRef = useRef();

  const navigate = useNavigate();
  const [observering, setObserving] = useState(false);

  // Make sure container is dynamic size
  const calculatedCategoryWidth = useMemo(() => {
    return `${100 / categoryKeys.length}%`;
  }, [categoryKeys]);

  const { intersect } = useMemo(() => intersecter(), []);

  useEffect(() => {
    if (!categoriesRef || !categoriesRef.current) return;

    const observer = intersect(categoriesRef, setObserving);

    return () => observer.disconnect();
  }, [intersect, categoriesRef]);

  return (
    <div className={classes.categoriesContainer} ref={categoriesRef}>
      {categoryKeys.map((category, index) => (
        <div
          className={`${classes.categoriesWrapper} ${
            observering ? fadeInClasses.smoothAppearance : ""
          } ${fadeInClasses.categoriesPreAppearance}`}
          key={index}
          style={{
            width: calculatedCategoryWidth,
            animationDelay: `${index * 0.1}s`,
          }}
          onClick={() => navigate(`./gallery?category=${category}&page=1`)}
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
