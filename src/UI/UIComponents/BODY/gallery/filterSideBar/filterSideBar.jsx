import classes from "./filterSideBar.module.scss";

const FilterSideBar = ({ data, filter, setFilter, setPage }) => {
  const handleFilter = (key) =>
    setFilter((prev) => (prev === key ? null : key)); // if user clicks on the same filter as currently active, it de-selects filter

  const dataKeys = Object.keys(data); // all dataKeys are Object names, so dataKeys is i.e. paintings, prints etc.

  console.log(filter);

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
