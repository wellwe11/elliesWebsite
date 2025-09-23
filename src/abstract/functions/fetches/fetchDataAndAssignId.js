import assignIdToEntries from "@functions/assignIdToEntries.js";
import fetchData from "./fetchData.js";

const fetchDataAndAssignID = async (link) => {
  const fetchedData = await fetchData(link);

  if (fetchedData) {
    const dataEntries = Object.entries(fetchedData);
    return assignIdToEntries(dataEntries);
  }
  return null;
};

export default fetchDataAndAssignID;
