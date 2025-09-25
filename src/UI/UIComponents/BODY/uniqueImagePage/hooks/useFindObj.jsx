import { useSearchParams } from "react-router-dom";

const useFindObj = (data) => {
  const [searchParams] = useSearchParams(),
    id = searchParams.get("page") || null;

  if (!data) return;

  return data?.find((obj) => obj.id === +id); // searches data for a matching id to params
};

export default useFindObj;
