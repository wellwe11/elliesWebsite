import { useEffect, useState } from "react";

import handleDisplayedProducts from "../functions/handleDisplayedProducts.js";

const useProductsLogic = (page, filteredData, isLoading) => {
  const [updatedData, setUpdatedData] = useState(() =>
    handleDisplayedProducts(page, filteredData)
  ); // initial data

  const slicedProducs = handleDisplayedProducts(page, filteredData); // runs each render to slice products based on page

  useEffect(() => {
    if (page && !isLoading) {
      setUpdatedData(slicedProducs);
      window.scrollTo({ top: 0 });
    }
  }, [page, filteredData, isLoading]);

  return { updatedData };
};

export default useProductsLogic;
