import classes from "./GALLERY.module.scss";
import fadeInClass from "@classes/fadeInOnLoad.module.scss";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LoadingWrapper from "@components/loadingAnimation/loadingIconWithBackground";

import useProductsLogic from "./hooks/useProductsLogic.jsx";
import stringToLink from "./functions/stringToLink.js";
import handleFilter from "./functions/handleFilter.js";

import PageSelector from "./components/pageSelector/pageSelector.jsx";
import FilterSideBar from "./components/filterSideBar/filterSideBar.jsx";
import Products from "./components/products/products.jsx";

// buttons on left to select specific items based on their type
const FilterSidebarWrapper = ({ categories, dataKeys }) => {
  const navigate = useNavigate();
  const [displayFilter, setDisplayFilter] = useState(false);

  const handleNavigate = (e) => {
    const activeFilters = handleFilter(e, categories || []);

    const stringCategories = stringToLink(activeFilters, "category"),
      link = `/gallery?${stringCategories}&page=1`;
    return navigate(link);
  };

  const handleDisplayFilters = () => {
    setTimeout(() => {
      setDisplayFilter(!displayFilter);
    }, 100);
  };

  return (
    <div className={classes.filterWrapper}>
      <div
        className={classes.popUpWrapper}
        style={{
          transform: displayFilter ? "translateX(0)" : "translateX(20px)",
          opacity: displayFilter ? "1" : "0",
        }}
      >
        <FilterSideBar
          dataKeys={dataKeys}
          handleFilter={handleNavigate}
          category={categories}
        />
      </div>

      <button onClick={handleDisplayFilters} className={classes.displayButton}>
        <p className={classes.text}>filters</p>
        <p className={`${classes.text} ${classes.amountActiveFilters}`}>
          {categories?.length > 0 ? (
            <>
              {"["}
              <span>{categories.length}</span>
              {"]"}
            </>
          ) : (
            ""
          )}
        </p>
      </button>
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
        <div className={classes.extendedNavbarWrapper}>
          <div className={classes.content}>
            <FilterSidebarWrapper dataKeys={dataKeys} categories={categories} />
            <PageWrapperComponent filteredData={updatedData} />
          </div>
        </div>
        <ProductsWrapperComponent filteredData={updatedData} page={page} />
      </div>
    </div>
  );
};

export default Gallery;
