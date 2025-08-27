import { useEffect, useMemo, useState } from "react";
import classes from "./GALLERY.module.scss";

// buttons that change pages, or rather, changes the index in which products can be displayed
const PageSelector = ({ page, setPage, products }) => {
  const pageNumber = +page + 1; // pages are 0-indexed, but are shown as 1-indexed because page 1 fits better than page 0 as initial page
  const maxPage = Math.ceil(products?.length / 9) - 1; // max-amount of pages that can be displayed - it is based on whether or not products exist on next page

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [page]);

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

  // creates a dynamic array which displays current set of pages (always pageNumber-1, pageNumber, pageNumber+1)
  // also allows a div-underline to display the active page
  const getPageWindow = (page, max) => {
    const start = Math.max(1, Math.min(page - 1, max - 2)); // ensures window doesn't overflow
    const end = Math.min(max, start + 2);
    const arr = [];
    for (let i = start; i <= end; i++) arr.push(i);
    return arr;
  };

  const someArr = getPageWindow(pageNumber, maxPage);

  const currentPageNumber = (
    <div className={classes.currentPageWrapper}>
      {someArr.map((arrNr, index) => (
        <button
          key={index}
          className={classes.pageSelectorButton}
          style={{ gridColumn: +index + 1 }}
          onClick={() => setPage(+arrNr - 1)}
        >
          <p className={classes.btnText}>{+arrNr}</p>

          {
            // makes it so that underline is correctly displaying current page
            pageNumber === arrNr && <div className={classes.underline} />
          }
        </button>
      ))}
    </div>
  );

  const leftButton = (
    <button
      className={classes.pageSelectorButton}
      onClick={decrement}
      disabled={page === 0}
      aria-label="Previous page"
    >
      <p className={classes.buttonText}>Previous</p>
    </button>
  );

  const rightButton = (
    <button
      className={classes.pageSelectorButton}
      onClick={increment}
      disabled={page === maxPage - 1}
      aria-label="Next page"
    >
      <p className={classes.buttonText}>Next</p>
    </button>
  );

  const backToZeroButton = (
    <button className={classes.pageSelectorButton} onClick={() => setPage(0)}>
      <p className={classes.buttonText}>1</p>
    </button>
  );

  return (
    <div className={classes.pageSelector}>
      {backToZeroButton}
      {leftButton}
      {currentPageNumber}
      {rightButton}
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
    const flatData = Object.values(data)
      .flat()
      .sort((a, b) => a.id - b.id);
    setFlattedData(flatData);
  }, [data]);

  // resets page when filter changes
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
