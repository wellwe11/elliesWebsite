import classes from "./filterSideBar.module.scss";

const FilterSideBar = ({ data, filter, setFilter, setPage }) => {
  const handleFilter = (key) =>
    setFilter((prev) => (prev === key ? null : key)); // if user clicks on the same filter as currently active, it de-selects filter

  const dataKeys = Object.keys(data); // all dataKeys are Object names, so dataKeys is i.e. paintings, prints etc.

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
                checked={filter === key}
                onChange={() => handleFilter(key)}
                onClick={() => setPage(1)}
              />
              {key}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterSideBar;
