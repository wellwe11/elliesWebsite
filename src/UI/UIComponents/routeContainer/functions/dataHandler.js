const dataHandler = (data, categories) => {
  if (!data) return [];

  // if user navigates to category

  if (categories) {
    const objValues = Object.values(data).flat();
    const ObjKeys = Object.keys(data);

    const filterObjects = objValues.filter((obj) => {
      const details = obj._embedded.details;
      const objCategory = details.type;

      const { type, ...detailsWithoutType } = details;

      const detailsValues = Object.values(detailsWithoutType);

      const productMustMatch = categories.every((e) => ObjKeys.includes(e)); // if only category (paintings/prints) is active
      if (productMustMatch) {
        // Only category is active (prints/paintings)
        return categories.includes(objCategory);
      } else {
        // if filter is active (set, single etc.)

        if (ObjKeys.every((e) => categories.includes(e))) {
          // If filter && category is active

          return (
            categories.some((e) => detailsValues.includes(e)) &&
            categories.includes(objCategory)
          );
          // if one category & 1 or more filters is active
        } else {
          return !ObjKeys.some((e) => categories.includes(e))
            ? categories.some((e) => detailsValues.includes(e))
            : categories.some((e) => detailsValues.includes(e)) &&
                categories.includes(objCategory);
        }
      }
    });

    return filterObjects;
  }

  // if user has no active category
  return Object.values(data) // since fetched data-objects are all stored in varius arrays, we flatten them and sort them based on id
    .flat()
    .sort((a, b) => a.id - b.id);
};

export default dataHandler;
