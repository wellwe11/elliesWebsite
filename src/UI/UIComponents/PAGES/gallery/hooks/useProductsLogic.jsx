import { useEffect, useState } from "react";

import handleDisplayedProducts from "../functions/handleDisplayedProducts.js";

// slices products based on what page user is on
const useProductsLogic = (page, filteredData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [updatedData, setUpdatedData] = useState(() =>
    handleDisplayedProducts(page, filteredData, 12)
  ); // initial data

  const slicedProducs = handleDisplayedProducts(page, filteredData, 12); // runs each render to slice products based on page

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
