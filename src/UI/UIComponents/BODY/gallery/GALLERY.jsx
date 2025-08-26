import { useEffect, useState } from "react";
import classes from "./GALLERY.module.scss";

const PageSelector = ({ page, setPage, products }) => {
  const handlePage = (type) => {
    if (type === "increment") {
      if (page * 9 <= products?.length) {
        setPage((prev) => prev + 1);
      }
    } else if (type === "decrement") {
      setPage((prev) => (prev > 1 ? prev - 1 : 1));
    } else {
      console.log("alex e inte smart hihi");
    }
  };

  return (
    <div>
      <button onClick={() => handlePage("decrement")}>{"<"}</button>
      {page}
      <button onClick={() => handlePage("increment")}>{">"}</button>
    </div>
  );
};

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
  const [productsOnPage, setProductsOnPage] = useState(null);
  const [filter, setFilter] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (!flattedData) return;

    // minImages displays the absolute minimum of index which is allowed to be shown on each page
    // page starts on 0, goes to 1, 2, 3 etc.
    // First image is then current page * 9.
    // So, 0, 8, 18 etc.
    const minImages = page * 9;

    // maxPage displays absolute maximum index that is displayed on current page
    // so, 8, 17, 26 etc.
    const maxPage = minImages + 8;
    console.log(minImages, maxPage);

    const imagesOnPage = flattedData.filter(
      (obj, index) => index >= minImages && index <= maxPage
    );

    console.log(imagesOnPage);

    setProductsOnPage(imagesOnPage);
  }, [flattedData, page]);

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

  if (!productsOnPage)
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
      <Products products={productsOnPage} filter={filter} />
    </div>
  );

  const pageWrapper = (
    <div className={classes.pageWrapper}>
      <PageSelector products={flattedData} page={page} setPage={setPage} />
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
