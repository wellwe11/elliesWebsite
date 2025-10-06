import useFetchDataIDs from "@hooks/useFetchDataIDs.jsx";

const useGalleryData = () => {
  /**
   * For future:
   *   const response = await fetch(`/api/products?page=${page}&limit=9`);
   * I will fetch items like so in the future, and avoid all logic of slicing depending on pages
   */

  const { data: printsData, loading: printLoading } = useFetchDataIDs(
    "/API_imitation/gallery/prints.json"
  );
  const { data: paintingsData, loading: paintLoading } = useFetchDataIDs(
    "/API_imitation/gallery/paintings.json"
  );

  const isLoading = printLoading || paintLoading;

  return { printsData, paintingsData, isLoading };
};

export default useGalleryData;
