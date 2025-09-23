import tryFetchFn from "@functions/tryFetchFn.jsx";

const fetchData = async (link) => {
  const data = await tryFetchFn(link);

  return data || null;
};

export default fetchData;
