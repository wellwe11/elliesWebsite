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
const FilterSideBarWrapperComponent = ({ dataKeys, categories }) => {
  const [localCategory, setLocalCategory] = useState(() =>
    categories ? [categories] : []
  );

  const navigate = useNavigate();

  const handleFilter = (e) => {
    if (e === null) {
      setLocalCategory([]);
      return navigate(`/gallery?page=1`);
    }

    const localArr = localCategory;

    const handleArray = () => {
      if (localArr.includes(e)) {
        const filteredArr = localArr.filter((a) => a !== e);
        setLocalCategory(filteredArr);
        return filteredArr;
      } else {
        localArr.push(e);
        setLocalCategory(localArr);
        return localArr;
      }
    };

    const tempArr = handleArray();

    const stringCategories = tempArr
      .map((c, index) => `${index > 0 ? "&" : ""}category=${c}`)
      .join("");

    // const link = `/gallery?${localCategory.forEach((c) => )}`

    return navigate(`/gallery?${stringCategories}&page=1`);
    // }
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
