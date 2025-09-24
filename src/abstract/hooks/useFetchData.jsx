import { useEffect, useState } from "react";
import tryFetchFn from "../functions/fetches/tryFetchFn.js";

const UseFetchData = (link) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetch = async () => {
      try {
        const fetchedData = await tryFetchFn(link);

        setData(fetchedData);
      } catch (error) {
        console.error("Failed to fetch data in useFetchData.jsx", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
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
