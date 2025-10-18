import classes from "./products.module.scss";
import { capitalizeFirstLetter } from "@functions/firstLetterCapital.js";

import QuickViewButton from "@fullyComponents/quickView/quickViewButton/quickViewButton.jsx";
import { useNavigate } from "react-router-dom";

const Products = ({ data }) => {
  const navigate = useNavigate();
  const dataEntries = Object.entries(data);
  const regex = /data/i;

  const fixedTitles = dataEntries.map(([entry, obj]) => {
    const fixedTitle = capitalizeFirstLetter(entry.replace(regex, ""));

    return [fixedTitle, obj];
  });

  const handleNavigate = (category, id) => {
    navigate(`uniqueImage?category=${category}&id=${id}`);
  };

  return (
    <div className={classes.categories}>
      {fixedTitles.map(([entry, obj], index) => (
        <div key={index} className={classes.products}>
          <div className={classes.categoryTitleWrapper}>
            <h3 className={classes.title}>{entry}</h3>
          </div>

          <div className={classes.products}>
            {obj.map((obj, index) => {
              const name = obj._embedded.setTitle;
              const image = obj.image;
              const id = obj.id;
              const category = obj._embedded.details.type;

              return (
                <div key={index} className={classes.product}>
                  <h5 className={classes.title}>{name}</h5>
                  <img className={classes.img} src={image} alt="" />
                  <QuickViewButton
                    text={"Explore"}
                    onClick={() => handleNavigate(category, id)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
