import classes from "./filterSideBar.module.scss";

/**
 * route: {category, id, hash, navigate, pageNumber}
 * state: {filter, setFilter, page, setPage}
 */

const FilterSideBar = ({
  dataKeys,
  handleFilter,
  state: { filter, setPage },
}) => {
  return (
    <div className={classes.filterSideBar}>
      <ul className={classes.filterUl}>
        {dataKeys.map((key, index) => (
          <li key={index} className={classes.filterLi}>
            <label
              className={`${classes.filterLabel} ${
                key === filter ? classes.activeFilter : ""
              }`}
            >
              <input
                className={classes.filterInput}
                type="checkbox"
                name="key-choices"
                checked={filter === key}
                onChange={() => handleFilter(key)}
                onClick={() => setPage(1)}
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
