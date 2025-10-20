import X_SVG from "../../../../../../abstract/components/SVGS/X_SVG/X_SVG.jsx";
import classes from "./filterSideBar.module.scss";
import ButtonWithUnderlineAndUndertext from "@components/buttonWithUnderlineAndUnderText/buttonWithUnderlineAndUndertext";

const FilterSideBar = ({ dataKeys, handleFilter, category }) => {
  console.log(category);
  return (
    <div className={classes.filterSideBar}>
      <ul className={classes.filterUl}>
        {dataKeys.map((key) => (
          <li key={key} className={classes.filterLi}>
            <button
              className={`${classes.filterButton} ${
                category === key ? classes.filterButtonActive : ""
              }`}
              onClick={() => handleFilter(key)}
            >
              <p className={classes.text}>{key}</p>
            </button>
          </li>
        ))}
        {category && (
          <div
            className={classes.closeFilter}
            onClick={() => handleFilter(null)}
          >
            <X_SVG />
          </div>
        )}
      </ul>
    </div>
  );
};

export default FilterSideBar;
