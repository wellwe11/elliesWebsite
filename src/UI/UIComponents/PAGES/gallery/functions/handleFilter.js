const resetFilter = () => [];

const removeFilter = (arr, filter) => arr.filter((a) => filter !== a);

const addFilter = (arr, filter) => {
  const localArr = arr;
  localArr.push(filter);
  return localArr;
};

const handleArray = (array, e) =>
  array.includes(e) ? removeFilter(array, e) : addFilter(array, e);

const handleFilter = (e, arr) =>
  e === null ? resetFilter() : handleArray(arr, e);

export default handleFilter;
