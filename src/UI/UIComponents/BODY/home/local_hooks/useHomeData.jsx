import useFetchData from "@hooks/useFetchData.jsx";
import useFetchDataIDs from "@hooks/useFetchDataIDs.jsx";

const useHomeData = () => {
  // fetch all data needed on front-page
  const { data: printData, printLoading } = useFetchDataIDs(
    "/API_imitation/home/paintings.json"
  );

  const { data: paintData, paintLoading } = useFetchDataIDs(
    "/API_imitation/home/prints.json"
  );

  const { data: serviceData, loading: serviceLoading } = useFetchData(
    "/API_imitation/home/services.json"
  );

  const isLoading = printLoading || paintLoading || serviceLoading;

  return { printData, paintData, serviceData, isLoading };
};

export default useHomeData;
