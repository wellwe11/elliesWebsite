import fetchDataAndAssignID from "@functions/fetches/fetchDataAndAssignId.js";
import { useEffect, useState, useTransition } from "react";

const useData = (tab, category) => {
  const path = `/API_imitation/${tab}/${category || "page"}.json`;

  const [data, setData] = useState(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let isMounted = true;

    startTransition(() => {
      setData(null);
    });

    const fetchData = async () => {
      const fetchedData = await fetchDataAndAssignID(path);

      if (isMounted && fetchedData) {
        startTransition(() => {
          setData(fetchedData);
        });
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [path]);

  return { data, isPending };
};

export default useData;
