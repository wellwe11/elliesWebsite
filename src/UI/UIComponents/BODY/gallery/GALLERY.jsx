import { useEffect, useState } from "react";
import classes from "./GALLERY.module.scss";

const Products = ({ products, filter }) => {
  const displayedProducts = (
    filter
      ? // if filter is active, find matching objects
        products.filter((obj) => obj?._embedded.details.type === filter)
      : // else display all objects
        products
  ).map((product, index) => (
    <div key={index} className={classes.productWrapper}>
      <img src={product.image} alt="" />
    </div>
  ));

  return (
    <div className={classes.products}>
      <div className={classes.productsContainer}>{displayedProducts}</div>
    </div>
  );
};

const FilterSideBar = ({ data, filter, setFilter }) => {
  // if user clicks on the same filter as currently active, it de-selects filter
  const handleFilter = (e) => (!filter ? setFilter(e) : setFilter(null));

  // all dataKeys are Object names, so dataKeys is i.e. paintings, prints etc.
  const dataKeys = Object.keys(data);
  const filterList = (
    <ul>
      {dataKeys.map((key, index) => (
        <li key={index}>
          <label>
            <input
              type="radio"
              name="key-choices"
              checked={filter === key}
              onChange={() => setFilter(key)}
              onClick={() => handleFilter(key)}
            />
            {key}
          </label>
        </li>
      ))}
    </ul>
  );

  return <div className={classes.filterSideBar}>{filterList}</div>;
};

const Gallery = ({ data }) => {
  const [flattedData, setFlattedData] = useState(null);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    if (!data) return null;

    // since objects are all stored in varius arrays, we flatten them and sort them based on id
    const flatData = (data) => {
      return Object.values(data)
        .flat()
        .sort((a, b) => a.id - b.id);
    };

    const flattedData = flatData(data);

    if (!flattedData) return null;

    setFlattedData(flattedData);
  }, [data]);

  const filterSideBarWrapper = (
    <div className={classes.filterSideBarWrapper}>
      <FilterSideBar data={data} filter={filter} setFilter={setFilter} />
    </div>
  );

  const productsWrapper = (
    <div className={classes.productsWrapper}>
      <Products products={flattedData} filter={filter} />
    </div>
  );

  if (!flattedData)
    return (
      <div>
        <h1>loading..</h1>
      </div>
    );
  return (
    <div className={classes.gallery}>
      {filterSideBarWrapper}
      {productsWrapper}
    </div>
  );
};

export default Gallery;
