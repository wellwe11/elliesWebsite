import classes from "./filterSideBar.module.scss";
import ButtonWithUnderlineAndUndertext from "@components/buttonWithUnderlineAndUnderText/buttonWithUnderlineAndUndertext";

const FilterSideBar = ({ dataKeys, handleFilter, category }) => {
  return (
    <div className={classes.filterSideBar}>
      <ul className={classes.filterUl}>
        {dataKeys.map((key, index) => (
          <li key={index} className={classes.filterLi}>
            <label className={classes.filterLabel}>
              <input
                className={classes.filterInput}
                type="checkbox"
                name="key-choices"
                checked={category === key}
                onChange={() => handleFilter(key)}
              />
              <div className={classes.textAndUnderline}>
                <ButtonWithUnderlineAndUndertext
                  index={index}
                  fontType={"h5"}
                  boolean={category === key}
                >
                  {key}
                </ButtonWithUnderlineAndUndertext>
              </div>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterSideBar;
