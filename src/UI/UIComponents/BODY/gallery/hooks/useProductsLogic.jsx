import { useEffect, useState } from "react";

import handleDisplayedProducts from "../functions/handleDisplayedProducts.js";

// slices products based on what page user is on
const useProductsLogic = (page, filteredData) => {
  const [isLoading, setIsLoading] = useState(true);
  const [updatedData, setUpdatedData] = useState(() =>
    handleDisplayedProducts(page, filteredData)
  ); // initial data

  const slicedProducs = handleDisplayedProducts(page, filteredData); // runs each render to slice products based on page

  useEffect(() => {
    setIsLoading(true);

    if (page) {
      setUpdatedData(slicedProducs);
      window.scrollTo({ top: 0 });
    }
    setIsLoading(false);
  }, [page, filteredData]);

  return { updatedData, isLoading };
};

export default useProductsLogic;
