const dataHandler = (data, category) => {
  if (!data) return [];

  // if user navigates to category
  if (category && data[category]) {
    return data[category];
  }

  // if user has no active category
  return Object.values(data) // since fetched data-objects are all stored in varius arrays, we flatten them and sort them based on id
    .flat()
    .sort((a, b) => a.id - b.id);
};

export default dataHandler;
