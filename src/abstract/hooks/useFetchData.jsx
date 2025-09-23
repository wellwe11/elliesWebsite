import { useEffect, useState } from "react";

import fetchDataAndAssignID from "@functions/fetches/fetchDataAndAssignId.js";
import fetchData from "@functions/fetches/fetchData.js";

// hook that fetches all data needed for the front-page;
const useFetchData = () => {
  const [data, setData] = useState(null);
  const [services, setServices] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [dataWithIDs, serviceData] = await Promise.all([
          fetchDataAndAssignID("/API_imitation/images.json"),
          fetchData("/API_imitation/services.json"),
        ]);

        setData(dataWithIDs);
        setServices(serviceData);
      } catch (error) {
        console.error("Failed to fetch data in useFetchData", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return { data, services, loading };
};

export default useFetchData;
