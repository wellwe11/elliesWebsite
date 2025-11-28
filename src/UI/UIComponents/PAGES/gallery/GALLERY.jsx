import classes from "./GALLERY.module.scss";
import fadeInClass from "@classes/fadeInOnLoad.module.scss";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LoadingWrapper from "@components/loadingAnimation/loadingIconWithBackground";

import useProductsLogic from "./hooks/useProductsLogic.jsx";
import stringToLink from "./functions/stringToLink.js";
import handleFilter from "./functions/handleFilter.js";

import PageSelector from "./components/pageSelector/pageSelector.jsx";
import FilterSideBar from "./components/filterSideBar/filterSideBar.jsx";
import Products from "./components/products/products.jsx";

// buttons on left to select specific items based on their type
const FilterSideBarWrapperComponent = ({ categories, dataKeys }) => {
  const navigate = useNavigate();

  const handleNavigate = (e) => {
    const activeFilters = handleFilter(e, categories || []);

    const stringCategories = stringToLink(activeFilters, "category"),
      link = `/gallery?${stringCategories}&page=1`;
    return navigate(link);
  };

  return (
    <div className={classes.filterSideBarWrapper}>
      <div className={classes.filterWrapper}>
        <FilterSideBar
          dataKeys={dataKeys}
          handleFilter={handleNavigate}
          category={categories}
        />
      </div>
    </div>
  );
};

const ProductsWrapperComponent = ({ page, filteredData }) => {
  const { updatedData, isLoading } = useProductsLogic(page, filteredData);

  return (
    <div className={classes.productsWrapper}>
      {isLoading && <LoadingWrapper condition={isLoading} />}
      <div
        className={`${classes.productsLoaded} ${
          isLoading ? classes.productsTransitioning : ""
        }`}
      >
        <Products products={updatedData} />
      </div>
    </div>
  );
};

const PageWrapperComponent = ({ filteredData }) => {
  const maxPage = Math.ceil(filteredData?.length / 12); // max-amount of pages that can be displayed - it is based on whether or not products exist on next page

  return (
    <div className={classes.pageWrapper}>
      <PageSelector maxPage={maxPage} />
    </div>
  );
};

const Gallery = ({ data: { categories, updatedData, page, dataKeys } }) => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [categories, page]);

  return (
    <div className={`${classes.gallery} ${fadeInClass.fade_in_on_load}`}>
      <div className={classes.galleryTop}>
        <FilterSideBarWrapperComponent
          dataKeys={dataKeys}
          categories={categories}
        />
        <ProductsWrapperComponent filteredData={updatedData} page={page} />
      </div>
      <PageWrapperComponent filteredData={updatedData} />
    </div>
  );
};

export default Gallery;
