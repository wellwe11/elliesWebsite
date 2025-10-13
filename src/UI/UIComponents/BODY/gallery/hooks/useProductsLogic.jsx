import { useEffect, useState } from "react";

import handleDisplayedProducts from "../functions/handleDisplayedProducts.js";

// slices products based on what page user is on
const useProductsLogic = (page, filteredData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [updatedData, setUpdatedData] = useState(() =>
    handleDisplayedProducts(page, filteredData)
  ); // initial data

  const slicedProducs = handleDisplayedProducts(page, filteredData); // runs each render to slice products based on page

  useEffect(() => {
    setIsLoading(true);

    if (page) {
      setUpdatedData(slicedProducs);
    }
    setIsLoading(false);
  }, [page, filteredData]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [page]);

  return { updatedData, isLoading };
};

export default useProductsLogic;
