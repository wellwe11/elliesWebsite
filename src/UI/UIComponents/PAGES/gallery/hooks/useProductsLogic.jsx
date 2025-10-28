import { useMemo, useState } from "react";

import handleDisplayedProducts from "../functions/handleDisplayedProducts.js";

// slices products based on what page user is on
const useProductsLogic = (page, filteredData) => {
  const [isLoading, setIsLoading] = useState(false);

  const updatedData = useMemo(() => {
    const slicedProducs = handleDisplayedProducts(page, filteredData, 12); // runs each render to slice products based on page
    setIsLoading(true);

    if (slicedProducs) {
      window.scrollTo({ top: 0 });
      setIsLoading(false);
      return slicedProducs;
    }
  }, [page, filteredData]);

  return { updatedData, isLoading };
};

export default useProductsLogic;
