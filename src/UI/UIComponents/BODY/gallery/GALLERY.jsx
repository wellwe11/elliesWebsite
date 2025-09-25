import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import classes from "./GALLERY.module.scss";
import PageSelector from "./components/pageSelector/pageSelector";
import FilterSideBar from "./components/filterSideBar/filterSideBar";
import Products from "./components/products/products";

import LoadingWrapper from "@components/loadingAnimation/loadingIconWithBackground";
import useProductsLogic from "./hooks/useProductsLogic.jsx";
import useUpdateDataLogic from "./hooks/useUpdateDataLogic.jsx";

// buttons on left to select specific items based on their type
const FilterSideBarWrapperComponent = ({ dataKeys, category }) => {
  const [localCategory, setLocalCategory] = useState(() => category);
  const navigate = useNavigate();

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

const Gallery = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [searchParams] = useSearchParams(),
    category = searchParams.get("category") || null,
    page = searchParams.get("page") || null;

  const { updatedData, loading } = useUpdateDataLogic(category);

  useEffect(() => {
    setHasLoaded(true);
  }, []);

  if (loading) return;

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
