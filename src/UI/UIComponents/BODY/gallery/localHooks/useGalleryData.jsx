import useFetchDataIDs from "@hooks/useFetchDataIDs.jsx";

const useGalleryData = () => {
  /**
   * For future:
   *   const response = await fetch(`/api/products?page=${page}&limit=9`);
   * I will fetch items like so in the future, and avoid all logic of slicing depending on pages
   */

  const { data: printData, loading: printLoading } = useFetchDataIDs(
    "/API_imitation/gallery/prints.json"
  );
  const { data: paintingData, loading: paintLoading } = useFetchDataIDs(
    "/API_imitation/gallery/paintings.json"
  );

  const loading = printLoading || paintLoading;

  return { printData, paintingData, loading };
};

export default useGalleryData;
