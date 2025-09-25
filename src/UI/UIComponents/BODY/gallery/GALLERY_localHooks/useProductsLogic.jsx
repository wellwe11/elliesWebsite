import { useEffect, useState } from "react";
import usePrevious from "@hooks/usePrevious.jsx";

import handleDisplayedProducts from "../local_functions/handleDisplayedProducts.js";

const useProductsLogic = (page, filteredData, setLoading) => {
  const [updatedData, setUpdatedData] = useState(() =>
    handleDisplayedProducts(page, filteredData)
  ); // initial data

  const prevPage = usePrevious(page);

  const slicedProducs = handleDisplayedProducts(page, filteredData); // runs each render to slice products based on page

  useEffect(() => {
    if (page && prevPage) {
      setLoading(true);

      setUpdatedData(slicedProducs);
      window.scrollTo({ top: 0 });
      setLoading(false);
    }
  }, [page, filteredData]);

  useEffect(() => {
    setLoading(false);
  }, []);

  return { updatedData };
};

export default useProductsLogic;
