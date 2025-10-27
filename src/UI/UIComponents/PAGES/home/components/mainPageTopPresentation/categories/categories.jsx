import classes from "./categories.module.scss";
import { useState } from "react";

const Categories = () => {
  const categories = ["Gallery", "Inspiration", "Contact"];
  const [hoverDelay, setHoverDelay] = useState(false);

  const enableHover = () => {
    if (hoverDelay) return;

    setHoverDelay(true);

    setTimeout(() => {
      setHoverDelay(false);
    }, 500);
  };

  return (
    <div className={classes.categories}>
      {categories.map((category, index) => (
        <div key={category} className={classes.textWrapper}>
          <button
            className={classes.button}
            style={{ animationDelay: `1.${index + 1}s` }}
            onMouseEnter={() => enableHover()}
          >
            <div className={classes.buttonBackgroundWrapper}>
              <div className={classes.buttonBackgroundFadeIn} />
              <div className={classes.buttonBackgroundFadeOut} />
            </div>
            <div className={classes.textOne}>
              {category.split("").map((l, index) => (
                <span
                  key={index + l}
                  className={classes.l}
                  style={{
                    transform: `translateY(${index * 1.4}px)`,
                    opacity: `calc(1 - 0.${index - 0.8})`,
                  }}
                >
                  {l}
                </span>
              ))}
            </div>
            <div className={classes.textTwo}>
              {category.split("").map((l, index) => (
                <span
                  key={index + l}
                  className={classes.l}
                  style={{
                    transform: `translateY(${index * 1.4}px)`,
                    opacity: `calc(1 - 0.${index - 0.8})`,
                  }}
                >
                  {l}
                </span>
              ))}
            </div>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Categories;
