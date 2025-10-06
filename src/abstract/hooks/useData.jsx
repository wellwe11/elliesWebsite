import fetchDataAndAssignID from "@functions/fetches/fetchDataAndAssignId.js";
import { useEffect, useMemo, useState } from "react";

const useData = (state, tab, category) => {
  const tabPath = tab === "" ? "home" : tab;
  const path = `/API_imitation/${tabPath}/${category || "page"}.json`;

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useMemo(() => {
    setData(null);
    setIsLoading(true);
  }, [path]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await fetchDataAndAssignID(path);

      if (fetchedData) {
        setData(fetchedData);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };
    fetchData();
  }, [path]);

  return { data, isLoading };
};

export default useData;
