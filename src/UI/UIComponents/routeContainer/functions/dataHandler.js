const dataHandler = (data, category) => {
  if (!data) return [];

  // if user navigates to category
  if (category) {
    const objValues = Object.values(data).flat();

    const filterObjects = objValues.filter((obj) => {
      const details = obj._embedded.details;

      const detailsValues = Object.values(details);

      return detailsValues.includes(category);
    });

    return filterObjects;
  }

  // if user has no active category
  return Object.values(data) // since fetched data-objects are all stored in varius arrays, we flatten them and sort them based on id
    .flat()
    .sort((a, b) => a.id - b.id);
};

export default dataHandler;
