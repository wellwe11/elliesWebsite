import classes from "./filterSideBar.module.scss";
import ButtonWithUnderlineAndUndertext from "@components/buttonWithUnderlineAndUnderText/buttonWithUnderlineAndUndertext";

const FilterSideBar = ({ dataKeys, handleFilter, category }) => {
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
              {key}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterSideBar;
