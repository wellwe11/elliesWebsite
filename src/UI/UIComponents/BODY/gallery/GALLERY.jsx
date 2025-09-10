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

import LoadingWrapper from "@components/loadingAnimation/loadingIconWithBackground";

// buttons on left to select specific items based on their type
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

// objects with image and some info and a quick-view option
const ProductsWrapperComponent = ({ filteredData }) => {
  const [newData, setNewData] = useState(filteredData); // if user changes
  const [prevData, setPrevData] = useState(newData);

  const [loading, setLoading] = useState(false);
  const { hash } = useLocation();

  // effect which adds a loading-screen to each time products change; visible appealing. Avoids stuttering when elements update information.
  useEffect(() => {
    setPrevData(newData); // to display old old products while loading new ones
    setLoading(true);
    const { disableScroll, enableScroll } = bodyNoScroll();

    disableScroll();

    const pageNumber = +hash.replace(/\D/g, "") || 1; // current page

    // page starts on 0, goes to 1, 2, 3 etc.
    const start = (pageNumber - 1) * 9; // index of first object to display
    // So, 0, 8, 18 etc.
    const end = start + 9; // index of last object to display
    // so, 8, 17, 26 etc.

    const displayedProducts = filteredData?.slice(start, end); // slices only visible objects for each page

    if (!displayedProducts) return; // need to create error-page if something hangs

    setNewData(displayedProducts);

    const timer = setTimeout(() => {
      setLoading(false);
      window.scroll({ top: 0 });
      enableScroll();
    }, 1500);

    return () => {
      clearTimeout(timer);
      enableScroll();
    };
  }, [filteredData]);

  // visible only while filter has changed
  const productIsLoading = (
    <div className={classes.productsLoading}>
      <LoadingWrapper condition={loading} />
      <Products products={prevData} />
    </div>
  );

  // visible once elements have loaded + 1.5s
  const productHasLoaded = (
    <div
      className={classes.productsLoaded}
      style={{
        visibility: loading ? "hidden" : "visible",
      }}
    >
      <Products products={newData} />
    </div>
  );

  return (
    <div className={classes.productsWrapper}>
      {productIsLoading}
      {productHasLoaded}
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

  if (!data) return;

  return (
    <div className={classes.gallery}>
      <div className={classes.galleryTop}>
        <FilterSideBarWrapperComponent data={data} />

        <Routes location={state?.backgroundLocation || location}>
          <Route
            path=":category?"
            element={<ProductsWrapperComponent filteredData={filteredData} />}
          />
        </Routes>
      </div>
      <PageWrapperComponent filteredData={filteredData} />
    </div>
  );
};

export default Gallery;
