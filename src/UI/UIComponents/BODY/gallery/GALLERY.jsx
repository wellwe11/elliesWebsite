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
    if (e === category) {
      navigate(`/gallery#1`); // reset navigation when user clicks button over again
    } else {
      navigate(`/gallery/${e}#1`); // navigate to first page to reset previous searched pages
    }
  };

  const dataKeys = Object.keys(data); // all dataKeys are Object names, so dataKeys is i.e. paintings, prints etc.

  return (
    <div className={classes.filterSideBarWrapper}>
      <FilterSideBar dataKeys={dataKeys} handleFilter={handleFilter} />
    </div>
  );
};

const ProductsWrapperComponent = ({ filteredData }) => (
  <div className={classes.productsWrapper}>
    <Products products={filteredData} />
  </div>
);

const PageWrapperComponent = ({ filteredData }) => (
  <div className={classes.pageWrapper}>
    <PageSelector products={filteredData} />
  </div>
);

const Gallery = ({ data }) => {
  // all types (paintings, prints, accessories are 'flattened')
  // Works like a parent-variable. Always contains an array of all data, and never changes.
  const [flattedData, setFlattedData] = useState(null);

  const { category } = useParams(); // category: paintings, prints etc for link. Id for page-number. If id is active, means you're currently on a category.
  const { hash } = useLocation();

  // Filters data based on current filter
  const filteredData = useMemo(() => {
    if (!flattedData) return; // only works if data has been platted
    if (!category) return flattedData; // if no filter, return unfilted data

    return data?.[category];
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
        <FilterSideBarWrapperComponent data={data} />

        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path=":category?"
              element={<ProductsWrapperComponent filteredData={filteredData} />}
            />
          </Routes>
        </Suspense>
      </div>
      <PageWrapperComponent filteredData={filteredData} />
    </div>
  );
};

export default Gallery;
