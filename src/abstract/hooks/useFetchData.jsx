import { useEffect, useState } from "react";
import tryFetchFn from "../functions/fetches/tryFetchFn.js";

const UseFetchData = (link) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      try {
        const fetchedData = await tryFetchFn(link);

        setData(fetchedData);
      } catch (error) {
        console.error("Failed to fetch data in useFetchData.jsx", error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [link]);

  return {
    data,
    loading,
  };
};

export default UseFetchData;
