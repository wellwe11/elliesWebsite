import classes from "./categories.module.scss";
import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";

import fadeInClasses from "@classes/fadeInOnLoad.module.scss";

import { capitalizeFirstLetter } from "@functions/firstLetterCapital.js";
import useCategoryEffect from "./hooks/useCategoryEffect.jsx";

// each category has a title. I.e. "Stickers, paintings etc"
const CategoryTitle = ({ title }) => {
  const titleCapital = capitalizeFirstLetter(title);

  return (
    <div className={classes.titleContainer}>
      <div className={classes.titleWrapper}>
        <h5 className={classes.title}>{titleCapital}</h5>
        <div className={classes.exploreWrapper}>
          <h6 className={classes.subTitle}>Explore</h6>
          <div className={classes.underline}>
            <div className={classes.underlineDot} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Category = ({
  categoriesLength,
  categoriesRef,
  index,
  category,
  img,
}) => {
  const link = `./gallery?category=${category}&page=1`;

  const { observering } = useCategoryEffect(categoriesRef); // displays the categories on intersection

  // Dynamic sizing for wrapper
  const categoriesWrapperStyle = useMemo(() => {
    return {
      width: `${100 / categoriesLength}%`,
      animationDelay: index * 0.1 + "s",
    };
  }, [categoriesLength, index]);

  const LinkClasses = `${classes.categoriesWrapper} 
    ${observering ? fadeInClasses.smoothAppearance : ""} 
    ${fadeInClasses.categoriesPreAppearance}`;

  return (
    <Link
      to={link}
      className={LinkClasses}
      key={index}
      style={categoriesWrapperStyle}
    >
      <div className={classes.imageWrapper}>
        <img className={classes.image} src={img} alt="" />
      </div>
      <CategoryTitle title={category} />
    </Link>
  );
};

const CategoryContainer = ({ categories }) => {
  // category names
  const categoriesRef = useRef();

  const categoryEntries = Object.entries(categories),
    categoriesLength = categoryEntries.length;

  return (
    <div className={classes.categoriesContainer} ref={categoriesRef}>
      {categoryEntries.map(([entry, obj], index) => (
        <Category
          categoriesLength={categoriesLength}
          categoriesRef={categoriesRef}
          key={index + entry}
          index={index}
          category={entry}
          img={obj.image}
        />
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
