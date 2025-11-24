import X_SVG from "@components/SVGS/X_SVG/X_SVG.jsx";
import classes from "./filterSideBar.module.scss";
import ButtonWithUnderlineAndUndertext from "@components/buttonWithUnderlineAndUnderText/buttonWithUnderlineAndUndertext";

const LiEl = ({ category, k, handleFilter }) => {
  return (
    <li className={classes.filterLi}>
      <button
        className={`${classes.filterButton} ${
          category?.includes(k) ? classes.filterButtonActive : ""
        }`}
        onClick={() => handleFilter(k)}
      >
        <p className={classes.text}>{k}</p>
      </button>
    </li>
  );
};

const SetLi = ({ handleFilter, category }) => {
  const sets = ["single", "set"];

  return sets.map((type) => (
    <LiEl key={type} category={category} k={type} handleFilter={handleFilter} />
  ));
};

const FilterSideBar = ({ dataKeys, handleFilter, category, Sets }) => {
  return (
    <div className={classes.filterSideBar}>
      <ul className={classes.filterUl}>
        <SetLi Sets={Sets} handleFilter={handleFilter} category={category} />
        {dataKeys.map((k) => (
          <LiEl key={k} category={category} k={k} handleFilter={handleFilter} />
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
