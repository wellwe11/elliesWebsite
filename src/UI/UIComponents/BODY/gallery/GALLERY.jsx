import { useEffect, useState } from "react";
import classes from "./GALLERY.module.scss";

const Products = ({ products, filter }) => {
  const mappedProducts = (
    <div className={classes.productsContainer}>
      {products.map((product, index) => (
        <div key={index} className={classes.productWrapper}>
          <img src={product.image} alt="" />
        </div>
      ))}
    </div>
  );

  return <div className={classes.products}>{mappedProducts}</div>;
};

const FilterSideBar = ({ filter, setFilter }) => {
  return (
    <div className={classes.filterSideBar}>
      <h1>This is sidebar</h1>
    </div>
  );
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

  console.log(flattedData);

  const filterSideBarWrapper = (
    <div className={classes.filterSideBarWrapper}>
      <FilterSideBar filter={filter} setFilter={setFilter} />
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
