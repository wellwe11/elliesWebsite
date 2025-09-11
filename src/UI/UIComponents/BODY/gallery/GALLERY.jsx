import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import classes from "./GALLERY.module.scss";
import PageSelector from "./pageSelector/pageSelector";
import FilterSideBar from "./filterSideBar/filterSideBar";
import Products from "./products/products";
import bodyNoScroll from "@functions/bodyNoScroll";

import LoadingWrapper from "@components/loadingAnimation/loadingIconWithBackground";

// used for rendering products based on the current page
const handleDisplayedProducts = (page, data) => {
  // page starts on 0, goes to 1, 2, 3 etc.
  const start = (+page - 1) * 9; // index of first object to display
  // So, 0, 8, 18 etc.
  const end = start + 9; // index of last object to display
  // so, 8, 17, 26 etc.

  return data?.slice(start, end); // slices only visible objects for each page
};

// buttons on left to select specific items based on their type
const FilterSideBarWrapperComponent = ({ data, category }) => {
  const navigate = useNavigate();

  const handleFilter = (e) => {
    if (e === category) {
      navigate(`/gallery?page=1`); // reset navigation when user clicks button over again
    } else {
      navigate(`/gallery?category=${e}&page=1`);
    }
  };

  const dataKeys = Object.keys(data); // all dataKeys are Object names, so dataKeys is i.e. paintings, prints etc.

  return (
    <div className={classes.filterSideBarWrapper}>
      <FilterSideBar
        dataKeys={dataKeys}
        handleFilter={handleFilter}
        category={category}
      />
    </div>
  );
};

// objects with image and some info and a quick-view option
const ProductsWrapperComponent = ({ filteredData, page }) => {
  const [newData, setNewData] = useState(filteredData); // if user changes
  const [prevData, setPrevData] = useState(null);

  const [loading, setLoading] = useState(false);

  const { disableScroll, enableScroll } = bodyNoScroll();

  const location = useLocation();

  // effect which adds a loading-screen to each time products change; visible appealing. Avoids stuttering when elements update information.
  useEffect(() => {
    console.log(location.search.length);
    if (location.search.length < 1) return;
    console.log("asd");

    setPrevData(newData); // to display old old products while loading new ones
    setLoading(true);
    disableScroll();

    const displayedProducts = handleDisplayedProducts(page, filteredData);
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
  }, [filteredData, page]);

  // visible only while filter has changed
  const productIsLoading = (
    <div
      className={classes.productsLoading}
      style={{ visibility: !loading ? "hidden" : "visible" }}
    >
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

const PageWrapperComponent = ({ filteredData }) => {
  const maxPage = Math.ceil(filteredData?.length / 9); // max-amount of pages that can be displayed - it is based on whether or not products exist on next page

  return (
    <div className={classes.pageWrapper}>
      <PageSelector maxPage={maxPage} />
    </div>
  );
};

const Gallery = ({ data }) => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || ""; // category: paintings, prints etc for link. Id for page-number. If id is active, means you're currently on a category.
  const page = searchParams.get("page") || 1;

  // all types (paintings, prints, accessories are 'flattened')
  // Works like a parent-variable. Always contains an array of all data, and never changes.
  const [flattedData, setFlattedData] = useState(null);

  // Filters data based on current filter
  const filteredData = useMemo(() => {
    if (!flattedData) return []; // only works if data has been platted
    if (!category) return flattedData; // if no filter, return unfilted data

    return data[category] || [];
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
        <FilterSideBarWrapperComponent data={data} category={category} />
        <ProductsWrapperComponent filteredData={filteredData} page={page} />
      </div>
      <PageWrapperComponent filteredData={filteredData} />
    </div>
  );
};

export default Gallery;
