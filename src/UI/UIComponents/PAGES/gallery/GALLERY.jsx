import classes from "./GALLERY.module.scss";
import fadeInClass from "@classes/fadeInOnLoad.module.scss";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageSelector from "./components/pageSelector/pageSelector.jsx";
import FilterSideBar from "./components/filterSideBar/filterSideBar.jsx";
import Products from "./components/products/products.jsx";

import LoadingWrapper from "@components/loadingAnimation/loadingIconWithBackground";
import useProductsLogic from "./hooks/useProductsLogic.jsx";

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
      <div className={classes.filterWrapper}>
        <FilterSideBar
          dataKeys={dataKeys}
          handleFilter={handleFilter}
          category={localCategory}
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

const Gallery = ({ data: { category, updatedData, page, dataKeys } }) => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [category, page]);

  return (
    <div className={`${classes.gallery} ${fadeInClass.fade_in_on_load}`}>
      <div className={classes.galleryTop}>
        <FilterSideBarWrapperComponent
          dataKeys={dataKeys}
          category={category}
        />
        <ProductsWrapperComponent filteredData={updatedData} page={page} />
      </div>
      <PageWrapperComponent filteredData={updatedData} />
    </div>
  );
};

export default Gallery;
