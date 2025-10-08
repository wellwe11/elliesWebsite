import fetchDataAndAssignID from "@functions/fetches/fetchDataAndAssignId.js";
import { useEffect, useMemo, useState } from "react";

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
      }, 0); //  setIsLoading runs once callstack is empty
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [path]);

  // forces loading to execute before returning data
  // Without it, data will be returned once before useEffect runs
  useMemo(() => {
    setIsLoading(true);
  }, [path]);

  return { data, isLoading };
};

export default useData;
