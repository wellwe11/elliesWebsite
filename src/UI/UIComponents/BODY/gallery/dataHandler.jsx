import { useEffect, useMemo, useState } from "react";

// all types (paintings, prints, accessories are 'flattened')
// Works like a parent-variable. Always contains an array of all data, and never changes.
const flattenData = (data) => {
  const [flattedData, setFlattedData] = useState(null);

  useEffect(() => {
    // effect that flattens data out to allow items to be displayed in 'random' order with no filters
    // runs only once, when data initially is loaded (on page-laod)
    if (!data) return;

    const flatData = Object.values(data) // since fetched data-objects are all stored in varius arrays, we flatten them and sort them based on id
      .flat()
      .sort((a, b) => a.id - b.id);
    setFlattedData(flatData);
  }, [data]);

  return flattedData;
};

const filterData = (data, category) => {
  const flattedData = flattenData(data);

  const filteredData = useMemo(() => {
    // Filters data based on current filter
    if (!flattedData) return []; // only works if data has been platted

    if (!category) return flattedData || []; // if no filter, return unfilted data

    return data[category] || [];
  }, [category, flattedData]);

  return filteredData;
};

const dataHandler = (data, category) => {
  return filterData(data, category);
};

export default dataHandler;
