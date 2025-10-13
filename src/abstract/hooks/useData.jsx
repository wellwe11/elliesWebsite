import fetchDataAndAssignID from "@functions/fetches/fetchDataAndAssignId.js";
import { useEffect, useState } from "react";

const useData = (tab, category) => {
  const path = `/API_imitation/${tab}/${category || "page"}.json`;

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const fetchData = async () => {
      const fetchedData = await fetchDataAndAssignID(path);

      if (isMounted && fetchedData) {
        setIsLoading(false);

        setData(fetchedData);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [path]);

  return { data, isLoading };
};

export default useData;
