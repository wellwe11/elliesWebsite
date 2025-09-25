import { useSearchParams } from "react-router-dom";
import useFetchDataIDs from "../../../../../abstract/hooks/useFetchDataIDs.jsx";

const useUniqueImageData = () => {
  const [searchParams] = useSearchParams(),
    category = searchParams.get("category") || null;

  const { data, loading } = useFetchDataIDs(
    `/API_imitation/gallery/${category}.json`
  );

  return { data, loading };
};

export default useUniqueImageData;
