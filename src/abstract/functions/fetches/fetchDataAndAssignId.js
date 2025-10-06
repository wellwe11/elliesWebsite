import assignIdToEntries from "../assignIdToEntries.js";
import assignIdToObjects from "../assignIdToObjs.js";
import tryFetchFn from "./tryFetchFn.js";

const fetchDataAndAssignID = async (link) => {
  const fetchedData = await tryFetchFn(link);

  if (fetchedData) {
    if (!Array.isArray(fetchedData)) {
      return assignIdToEntries(fetchedData);
    } else {
      return assignIdToObjects(fetchedData);
    }
  }
  return null;
};

export default fetchDataAndAssignID;
