import { useEffect, useState } from "react";

import fetchDataAndAssignID from "@functions/fetches/fetchDataAndAssignId.js";

// hook that fetches all data needed for the front-page;
const useFetchDataIDs = (link) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const data = await fetchDataAndAssignID(link);
        setData(data);
      } catch (error) {
        console.error("Failed to fetch data in useFetchData", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchData();
  }, [link]);

  return { data, loading };
};

export default useFetchDataIDs;
