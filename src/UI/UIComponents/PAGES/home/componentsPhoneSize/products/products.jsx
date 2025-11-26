import classes from "./products.module.scss";
import { capitalizeFirstLetter } from "@functions/firstLetterCapital.js";

import { useNavigate } from "react-router-dom";
import ArrowNoBodySVG from "@components/SVGS/arrowNoBodySVG/arrowNoBodySVG.jsx";
import { useMemo } from "react";

const Category = ({ children, entry, handleNavigate }) => {
  return (
    <div className={classes.category}>
      <div
        className={classes.categoryTitleWrapper}
        onClick={() =>
          handleNavigate(`gallery?category=${entry.toLowerCase()}&page=1`)
        }
      >
        <h3 className={classes.title}>{entry}</h3>
        <div className={classes.exploreMoreWrapper}>
          <h6 className={classes.exploreMore}>Explore whole collection</h6>
          <div className={classes.arrowSVG}>
            <ArrowNoBodySVG />
          </div>
        </div>
        <div className={classes.underlineWithDot}>
          <div className={classes.dot} />
        </div>
      </div>
      {children}
    </div>
  );
};

const Product = ({ name, image, category, id, handleNavigate }) => {
  return (
    <div className={classes.product}>
      <h5 className={classes.title}>{name}</h5>
      <div className={classes.imgWrapper}>
        <img
          className={classes.img}
          src={image}
          alt=""
          onClick={() =>
            handleNavigate(`uniqueImage?category=${category}&id=${id}`)
          }
        />
      </div>
    </div>
  );
};

const Products = ({ data }) => {
  const regex = /data/i;
  // simplified data-structure for mobile-screen data
  const dataEntries = useMemo(() => Object.entries(data), [data]).map(
    ([entry, obj]) => {
      const fixedTitle = capitalizeFirstLetter(entry.replace(regex, ""));

      return [fixedTitle, obj];
    },
    [data]
  );

  const navigate = useNavigate(),
    handleNavigate = (link) => {
      navigate(link);
    };

  return (
    <div className={classes.categories}>
      {dataEntries.map(([entry, obj], index) => (
        <Category key={index} entry={entry} handleNavigate={handleNavigate}>
          <div className={classes.products}>
            {obj.map((obj, index) => {
              const name = obj.setTitle;
              const image = obj.image;
              const id = obj.id;
              const category = obj.type;

              return (
                <Product
                  handleNavigate={handleNavigate}
                  key={index}
                  name={name}
                  image={image}
                  id={id}
                  category={category}
                />
              );
            })}
          </div>
        </Category>
      ))}
    </div>
  );
};

export default Products;
