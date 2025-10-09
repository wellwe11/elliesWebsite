import fetchDataAndAssignID from "@functions/fetches/fetchDataAndAssignId.js";
import { useEffect, useState } from "react";

const useData = (tab, category) => {
  const path = `/API_imitation/${tab}/${category || "page"}.json`;

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    let isMounted = true;

    setData(null);
    setIsLoading(true);

    const fetchData = async () => {
      const fetchedData = await fetchDataAndAssignID(path);

      if (isMounted && fetchedData) {
        setData(fetchedData);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
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
