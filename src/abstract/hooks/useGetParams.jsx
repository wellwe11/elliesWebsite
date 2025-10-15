import { useSearchParams } from "react-router-dom";

const useGetParams = () => {
  const [searchParams] = useSearchParams(),
    category = searchParams.get("category") || null,
    id =
      +searchParams.get("id") === "0" || searchParams.get("id") === "0"
        ? 0
        : null,
    page = +searchParams.get("page") || null;

  return { category, id, page };
};

export default useGetParams;
