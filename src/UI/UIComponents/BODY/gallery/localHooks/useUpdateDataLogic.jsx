import { useMemo } from "react";
import dataHandler from "../localFunctions/dataHandler.js";
import useGalleryData from "./useGalleryData.jsx";

const useUpdateDataLogic = (category) => {
  const { printData, paintingData, loading } = useGalleryData();

  const updatedData = useMemo(() => {
    if (!printData || !paintingData) return null;

    const data = { prints: printData, paintings: paintingData };
    return dataHandler(data, category);
  }, [printData, paintingData, category]); // flats data and filters data depending on category active

  return { updatedData, loading };
};

export default useUpdateDataLogic;
