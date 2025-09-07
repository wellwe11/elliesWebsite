import { Suspense, useEffect, useMemo, useState } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import classes from "./GALLERY.module.scss";
import PageSelector from "./pageSelector/pageSelector";
import FilterSideBar from "./filterSideBar/filterSideBar";
import Products from "./products/products";

const FilterSideBarWrapperComponent = ({ data }) => {
  const navigate = useNavigate();
  const { category } = useParams();

  const handleFilter = (e) => {
    console.log(e, category);
    if (e === category) {
      navigate(`/gallery#1`); // reset navigation when user clicks button over again
    } else {
      navigate(`/gallery/${e}#1`); // navigate to first page to reset previous searched pages
    }
  };

  const dataKeys = Object.keys(data); // all dataKeys are Object names, so dataKeys is i.e. paintings, prints etc.

  const filterSideBarWrapper = (
    <div className={classes.filterSideBarWrapper}>
      <FilterSideBar dataKeys={dataKeys} handleFilter={handleFilter} />
    </div>
  );

  return filterSideBarWrapper;
};

const ProductsWrapperComponent = ({ filteredData, state: { page } }) => {
  const productsWrapper = (
    <div className={classes.productsWrapper}>
      <Products products={filteredData} page={page} />
    </div>
  );
  return productsWrapper;
};

const PageWrapperComponent = ({ filteredData, state: { page, setPage } }) => {
  const pageWrapper = (
    <div className={classes.pageWrapper}>
      <PageSelector products={filteredData} page={page} setPage={setPage} />
    </div>
  );

  return pageWrapper;
};

const Gallery = ({ data }) => {
  // all types (paintings, prints, accessories are 'flattened')
  // Works like a parent-variable. Always contains an array of all data, and never changes.
  const [flattedData, setFlattedData] = useState(null);

  /**
   * route: {category, id, hash, navigate, pageNumber}
   * state: {filter, setFilter, page, setPage}
   */

  // route
  const { hash } = useLocation(); // page-number
  const { category } = useParams(); // category: paintings, prints etc for link. Id for page-number. If id is active, means you're currently on a category.

  const navigate = useNavigate();

  const pageNumber = +hash.replace(/\D/g, "") || 1; // remove hash or anything else that comes with the current page

  const [page, setPage] = useState(pageNumber); // active page

  // object to simplify props to send to child-components
  const state = {
    page,
    setPage,
  };

  useEffect(() => {
    navigate({
      hash: `#${page}`,
    });
  }, [page]);

  console.log(category, page);

  // Filters data based on current filter
  const filteredData = useMemo(() => {
    if (!flattedData) return; // only works if data has been platted
    if (category === "page" || !category) return flattedData; // if no filter, return unfilted data

    return flattedData.filter(
      (obj) => obj?._embedded.details.type === category
    ); // otherwise, filter data based on active filter
  }, [category, flattedData]);

  // effect that flattens data out to allow items to be displayed in 'random' order with no filters
  // runs only once, when data initially is loaded (on page-laod)
  useEffect(() => {
    if (!data) return;

    const flatData = Object.values(data) // since fetched data-objects are all stored in varius arrays, we flatten them and sort them based on id
      .flat()
      .sort((a, b) => a.id - b.id);
    setFlattedData(flatData);
  }, [data]);

  if (!filteredData)
    return (
      <div>
        <h1>loading..</h1>
      </div>
    );

  return (
    <div className={classes.gallery}>
      <div className={classes.galleryTop}>
        <FilterSideBarWrapperComponent data={data} state={state} />

        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path=":category?"
              element={
                <ProductsWrapperComponent
                  filteredData={filteredData}
                  state={state}
                />
              }
            ></Route>
          </Routes>
        </Suspense>
      </div>
      <PageWrapperComponent filteredData={filteredData} state={state} />
    </div>
  );
};

export default Gallery;
