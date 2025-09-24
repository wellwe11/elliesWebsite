import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import classes from "./GALLERY.module.scss";
import PageSelector from "./pageSelector/pageSelector";
import FilterSideBar from "./filterSideBar/filterSideBar";
import Products from "./products/products";

import LoadingWrapper from "@components/loadingAnimation/loadingIconWithBackground";
import dataHandler from "./dataHandler.jsx";
import bodyNoScroll from "@functions/bodyNoScroll.js";
import usePrevious from "@hooks/usePrevious.jsx";
import useFetchDataIDs from "../../../../abstract/hooks/useFetchDataIDs.jsx";

// used for rendering products based on the current page
const handleDisplayedProducts = (page, data) => {
  // page starts on 0, goes to 1, 2, 3 etc.
  const start = (+page - 1) * 9, // index of first object to display
    // So, 0, 8, 18 etc.
    end = start + 9; // index of last object to display
  // so, 8, 17, 26 etc.

  return data?.slice(start, end); // slices only visible objects for each page
};

// buttons on left to select specific items based on their type
const FilterSideBarWrapperComponent = ({ dataKeys, category }) => {
  const navigate = useNavigate();

  const [localCategory, setLocalCategory] = useState(null);

  const handleFilter = (e) => {
    if (e === category) {
      setLocalCategory(null);
      navigate(`/gallery?page=1`); // reset navigation when user clicks button over again
    } else {
      setLocalCategory(e);
      navigate(`/gallery?category=${e}&page=1`);
    }
  };

  return (
    <div className={classes.filterSideBarWrapper}>
      <FilterSideBar
        dataKeys={dataKeys}
        handleFilter={handleFilter}
        category={localCategory}
      />
    </div>
  );
};

// objects with image and some info and a quick-view option
const ProductsWrapperComponent = ({ page, filteredData }) => {
  const [newData, setNewData] = useState(
    handleDisplayedProducts(page, filteredData)
  );

  const [prevData, setPrevData] = useState(null);
  const { disableScroll, enableScroll } = bodyNoScroll();

  const prevPage = usePrevious(page); // used to determine if scrollTop should be used or not

  const location = useLocation();

  const [loading, setLoading] = useState(false);

  const displayedProducts = handleDisplayedProducts(page, filteredData); // update new products

  const updateData = () => {
    // start loading animation

    if (!loading) {
      setPrevData(newData.slice(0, 9)); // display old products while loading new ones
    }

    setLoading(true);
    disableScroll();

    setNewData(displayedProducts);

    return setTimeout(() => {
      // initiate reload
      setLoading(false);
      enableScroll();

      if (prevPage) {
        window.scroll({ top: 0 });
      }
    }, 1500);
  };

  useEffect(() => {
    // effect which adds a loading-screen to each time products change; visible appealing. Avoids stuttering when elements update information.
    if (!prevPage) return;
    if (location.search.length < 1) return;

    updateData();
  }, [page, filteredData]);

  useEffect(() => {
    if (newData?.length < 1) {
      updateData();
    }
  }, [filteredData]);

  // visible only while filter has changed
  const productIsLoading = (
    <div
      className={classes.productsLoading}
      style={{ visibility: loading ? "visible" : "hidden" }} // reason for having an additional visibility to loadingIconWithBackground's own conditionial visiblity is to display 'old' products while loading, to give the appearance that old products are displayable while new ones are loading in and pre-rendering
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
        visibility: loading ? "hidden" : "visible", // same as productIsLoading - preloading products while keeping visibility hidden, to avoid a laggy appearance once the products have fully loaded
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

const useGalleryData = () => {
  /**
   * For future:
   *   const response = await fetch(`/api/products?page=${page}&limit=9`);
   * I will fetch items like so in the future, and avoid all logic of slicing depending on pages
   */

  const { data: printData, loading: printLoading } = useFetchDataIDs(
    "/API_imitation/gallery/prints.json"
  );
  const { data: paintingData, loading: paintLoading } = useFetchDataIDs(
    "/API_imitation/gallery/paintings.json"
  );

  const loading = printLoading || paintLoading;

  return { printData, paintingData, loading };
};

const Gallery = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [searchParams] = useSearchParams(),
    category = searchParams.get("category") || null,
    page = searchParams.get("page") || null;

  const { printData, paintingData, loading } = useGalleryData();

  const updatedData = useMemo(() => {
    if (loading) return null;

    const data = { prints: printData, paintings: paintingData };

    return dataHandler(data, category);
  }, [printData, paintingData, loading, category]); // flats data and filters data depending on category active

  useEffect(() => {
    setHasLoaded(true);
  }, []);

  if (!updatedData) return;

  return (
    <div className={classes.gallery} key={hasLoaded}>
      <div className={classes.galleryTop}>
        <FilterSideBarWrapperComponent
          dataKeys={["prints", "paintings"]} // all dataKeys are Object names, so dataKeys is i.e. paintings, prints etc.
          category={category}
        />
        <ProductsWrapperComponent filteredData={updatedData} page={page} />
      </div>
      <PageWrapperComponent filteredData={updatedData} />
    </div>
  );
};

export default Gallery;
