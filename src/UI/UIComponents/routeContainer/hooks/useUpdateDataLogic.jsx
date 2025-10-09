import { useMemo } from "react";
import dataHandler from "../functions/dataHandler.js";

const useUpdateDataLogic = (category, data) => {
  const updatedData = useMemo(() => {
    if (!data) return null;
    return dataHandler(data, category); // will make more dynamic in future
  }, [data, category]); // flats data and filters data depending on category active

  return { updatedData };
};

export default useUpdateDataLogic;
