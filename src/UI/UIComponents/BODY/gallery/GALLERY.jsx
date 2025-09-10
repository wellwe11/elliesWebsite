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
import bodyNoScroll from "@functions/bodyNoScroll";
import LoadingAnimation from "@components/loadingAnimation/loadingAnimation";

const LoadingWrapper = () => {
  return (
    <div className={classes.loading}>
      <div className={classes.loadingBackground}>
        <div className={classes.loadingWrapper}>
          <LoadingAnimation />
        </div>
      </div>
    </div>
  );
};

const FilterSideBarWrapperComponent = ({ data }) => {
  const navigate = useNavigate();
  const { category } = useParams();

  const handleFilter = (e) => {
    if (e === category) {
      navigate(`/gallery#1`); // reset navigation when user clicks button over again
    } else {
      navigate(`/gallery/${e}#1`);
    }
  };

  const dataKeys = Object.keys(data); // all dataKeys are Object names, so dataKeys is i.e. paintings, prints etc.

  return (
    <div className={classes.filterSideBarWrapper}>
      <FilterSideBar dataKeys={dataKeys} handleFilter={handleFilter} />
    </div>
  );
};

const ProductsWrapperComponent = ({ filteredData }) => {
  const [newData, setNewData] = useState(filteredData);
  const [prevData, setPrevData] = useState(newData);

  const [loading, setLoading] = useState(false);
  const { hash } = useLocation();

  // effect which adds a loading-screen to each time products change, to allow for smooth transition.
  // Will update it so it stays on the same page for 1 second instead, and then navigates
  useEffect(() => {
    setPrevData(newData); // to display old old products while loading new ones
    setLoading(true);
    bodyNoScroll().disableScroll();

    const pageNumber = +hash.replace(/\D/g, "") || 1; // remove hash or anything else that comes with the current page
    // start displays the absolute minimum of index which is allowed to be shown on each page
    // page starts on 0, goes to 1, 2, 3 etc.
    const start = (pageNumber - 1) * 9; // First image is then current (page - 1) * 9. -1 because pages are not based on index, but index + 1 (to avoid page being displayed as 0)
    // So, 0, 8, 18 etc.
    const end = start + 9; // end displays absolute maximum index that is displayed on current page
    // so, 8, 17, 26 etc.

    const displayedProducts = filteredData?.slice(start, end); // slices only visible objects for each page

    if (!displayedProducts) return; // need to create error-page if something hangs

    setNewData(displayedProducts);

    const timer = setTimeout(() => {
      setLoading(false);
      window.scroll({ top: 0 });
      bodyNoScroll().enableScroll();
    }, 1500);

    return () => clearTimeout(timer);
  }, [filteredData]);

  return (
    <div className={classes.productsWrapper}>
      <div
        className={classes.productsLoading}
        style={{
          visibility: loading ? "visible" : "hidden",
        }}
      >
        <LoadingWrapper />
        <Products products={prevData} />
      </div>

      <div
        className={classes.productsLoaded}
        style={{
          visibility: loading ? "hidden" : "visible",
        }}
      >
        <Products products={newData} />
      </div>
    </div>
  );
};

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
  const location = useLocation();
  const state = location.state;

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

  return (
    <div className={classes.gallery}>
      <div className={classes.galleryTop}>
        <FilterSideBarWrapperComponent data={data} />

        <Suspense
          fallback={
            <div style={{ backgroundColor: "orange" }}>
              Loading... inside of suspense{" "}
            </div>
          }
        >
          <Routes location={state?.backgroundLocation || location}>
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
