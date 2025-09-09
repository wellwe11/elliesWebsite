import { useParams } from "react-router-dom";
import classes from "./filterSideBar.module.scss";

const FilterSideBar = ({ dataKeys, handleFilter }) => {
  const { category } = useParams();

  const ActiveLabel = ({ objKey }) => (
    <label className={classes.activeFilter}>
      <h3 className={classes.filterText}>{objKey}</h3>
    </label>
  );

  return (
    <div className={classes.filterSideBar}>
      <ul className={classes.filterUl}>
        {dataKeys.map((key, index) => (
          <li key={index} className={classes.filterLi}>
            <label className={classes.filterLabel}>
              {category === key ? <ActiveLabel objKey={key} /> : ""}
              <input
                className={classes.filterInput}
                type="checkbox"
                name="key-choices"
                checked={category === key}
                onChange={() => handleFilter(key)}
              />
              <div className={classes.textAndUnderline}>
                <h3 className={classes.filterText}>{key}</h3>
                <div className={classes.underline}>
                  <div className={classes.underlineDot} />
                </div>
              </div>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterSideBar;
