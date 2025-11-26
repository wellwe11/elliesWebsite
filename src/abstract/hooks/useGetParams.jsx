import { useSearchParams } from "react-router-dom";

const useGetParams = (other) => {
  const [searchParams] = useSearchParams(),
    category = searchParams.get("category") || null,
    id = +searchParams.get("id")
      ? +searchParams.get("id")
      : searchParams.get("id") === "0"
      ? 0
      : null,
    page = +searchParams.get("page") || null,
    otherGet = searchParams.get(other);

  return { category, id, page, otherGet };
};

export default useGetParams;
