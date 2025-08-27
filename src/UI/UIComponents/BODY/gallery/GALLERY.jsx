import { useEffect, useMemo, useState } from "react";
import classes from "./GALLERY.module.scss";

// buttons that change pages, or rather, changes the index in which products can be displayed
const PageSelector = ({ page, setPage, products }) => {
  const pageNumber = +page + 1; // pages are 0-indexed, but are shown as 1-indexed because page 1 fits better than page 0 as initial page
  const maxPage = Math.ceil(products?.length / 9) - 1; // max-amount of pages that can be displayed - it is based on whether or not products exist on next page

  // change page forward
  const increment = () => {
    // if next page can contain products
    if (page < maxPage) {
      setPage((prev) => prev + 1);
    }
  };

  // change page backwards
  const decrement = () => {
    // prevent page from going below 0
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <div>
      <button
        onClick={decrement}
        disabled={page === 0}
        aria-label="Previous page"
      >
        {"<"}
      </button>
      {pageNumber}
      <button
        onClick={increment}
        disabled={page === maxPage}
        aria-label="Next page"
      >
        {">"}
      </button>
    </div>
  );
};

const Products = ({ products, page }) => {
  // minImages displays the absolute minimum of index which is allowed to be shown on each page
  // page starts on 0, goes to 1, 2, 3 etc.
  // First image is then current page * 9.
  // So, 0, 8, 18 etc.
  const start = page * 9;

  // maxPage displays absolute maximum index that is displayed on current page
  // so, 8, 17, 26 etc.
  const end = start + 9;

  // slices only visible objects
  const displayedProducts = products.slice(start, end);

  const mappedProductImages = displayedProducts.map((product, index) => (
    <div key={index} className={classes.productWrapper}>
      <img src={product.image} alt="" />
    </div>
  ));

  return (
    <div className={classes.products}>
      <div className={classes.productsContainer}>{mappedProductImages}</div>
    </div>
  );
};

const FilterSideBar = ({ data, filter, setFilter }) => {
  // if user clicks on the same filter as currently active, it de-selects filter
  const handleFilter = (key) =>
    setFilter((prev) => (prev === key ? null : key));

  // all dataKeys are Object names, so dataKeys is i.e. paintings, prints etc.
  const dataKeys = Object.keys(data);
  const filterList = (
    <ul className={classes.filterSideBarUL}>
      {dataKeys.map((key, index) => (
        <li key={index}>
          <label>
            <input
              type="checkbox"
              name="key-choices"
              checked={filter === key}
              onChange={() => handleFilter(key)}
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
  // all types (paintings, prints, accessories are 'flattened')
  // Works like a parent-variable. Always contains an array of all data, and never changes.
  const [flattedData, setFlattedData] = useState(null);

  // filter-boolean - when active, changes filteredData to matching objects
  const [filter, setFilter] = useState(null);

  // active page
  const [page, setPage] = useState(0);

  // Filtered data based on current filter
  const filteredData = useMemo(() => {
    if (!filter) return flattedData;

    return flattedData.filter((obj) => obj?._embedded.details.type === filter);
  }, [filter, flattedData]);

  // effect that flattens data out to allow items to be displayed in 'random' order with no filters
  // runs only once, when data initially is loaded (on page-laod)
  useEffect(() => {
    if (!data) return;

    // since objects are all stored in varius arrays, we flatten them and sort them based on id
    const flatData = (data) => {
      return Object.values(data)
        .flat()
        .sort((a, b) => a.id - b.id);
    };

    const flattedData = flatData(data);
    if (!flattedData) return;
    setFlattedData(flattedData);
  }, [data]);

  useEffect(() => {
    setPage(0);
  }, [filter]);

  if (!filteredData)
    return (
      <div>
        <h1>loading..</h1>
      </div>
    );

  const filterSideBarWrapper = (
    <div className={classes.filterSideBarWrapper}>
      <FilterSideBar data={data} filter={filter} setFilter={setFilter} />
    </div>
  );

  const productsWrapper = (
    <div className={classes.productsWrapper}>
      <Products products={filteredData} page={page} />
    </div>
  );

  const pageWrapper = (
    <div className={classes.pageWrapper}>
      <PageSelector products={filteredData} page={page} setPage={setPage} />
    </div>
  );

  return (
    <div className={classes.gallery}>
      <div className={classes.galleryTop}>
        {filterSideBarWrapper}
        {productsWrapper}
      </div>
      {pageWrapper}
    </div>
  );
};

export default Gallery;
