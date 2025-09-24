import fetchData from "./fetchData.js";
import assignIdToObjects from "../assignIdToObjs.js";

const fetchDataAndAssignID = async (link) => {
  const fetchedData = await fetchData(link);

  if (fetchedData) {
    return assignIdToObjects(fetchedData);
  }
  return null;
};

export default fetchDataAndAssignID;
