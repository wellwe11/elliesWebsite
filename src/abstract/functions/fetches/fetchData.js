import tryFetchFn from "@functions/fetches/tryFetchFn.js";

const fetchData = async (link) => {
  const data = await tryFetchFn(link);

  return data || null;
};

export default fetchData;
