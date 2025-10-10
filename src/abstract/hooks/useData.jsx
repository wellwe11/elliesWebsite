import fetchDataAndAssignID from "@functions/fetches/fetchDataAndAssignId.js";
import { useLayoutEffect, useState } from "react";

const useData = (tab, category) => {
  const path = `/API_imitation/${tab}/${category || "page"}.json`;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const fetchedData = await fetchDataAndAssignID(path);

    if (fetchedData) {
      setData(fetchedData);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } else {
      setIsLoading(true);
    }
  };

  return { data, isLoading };
};

export default useData;
