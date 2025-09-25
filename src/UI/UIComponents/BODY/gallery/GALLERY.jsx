import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import classes from "./GALLERY.module.scss";
import PageSelector from "./pageSelector/pageSelector";
import FilterSideBar from "./filterSideBar/filterSideBar";
import Products from "./products/products";

import handleDisplayedProducts from "./handleDisplayedProducts.js";

import LoadingWrapper from "@components/loadingAnimation/loadingIconWithBackground";
import dataHandler from "./dataHandler.js";
import usePrevious from "@hooks/usePrevious.jsx";
import useFetchDataIDs from "@hooks/useFetchDataIDs.jsx";

// buttons on left to select specific items based on their type
const FilterSideBarWrapperComponent = ({ dataKeys, category }) => {
  const navigate = useNavigate();

  const [localCategory, setLocalCategory] = useState(() => category);

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

const useProductsLogic = (page, filteredData, setLoading) => {
  const [updatedData, setUpdatedData] = useState(() =>
    handleDisplayedProducts(page, filteredData)
  ); // initial data

  const prevPage = usePrevious(page);

  const slicedProducs = handleDisplayedProducts(page, filteredData); // runs each render to slice products based on page

  useEffect(() => {
    if (page && prevPage) {
      setLoading(true);

      setUpdatedData(slicedProducs);
      window.scrollTo({ top: 0 });
      setLoading(false);
    }
  }, [page, filteredData]);

  useEffect(() => {
    setLoading(false);
  }, []);

  return { updatedData };
};

// objects with image and some info and a quick-view option
const ProductsWrapperComponent = ({ page, filteredData }) => {
  const [loading, setLoading] = useState(false);
  const { updatedData } = useProductsLogic(page, filteredData, setLoading);

  return (
    <div className={classes.productsWrapper}>
      {loading && <LoadingWrapper condition={loading} />}
      <div
        className={`${classes.productsLoaded} ${
          loading ? classes.productsTransitioning : ""
        }`}
      >
        <Products products={updatedData} />
      </div>
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

const useGalleryLogic = () => {
  // custom hook where I will put complex calculations
  // i.e.  fetching, flattening, filtering, and initial slicing logic
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
