const dataHandler = (data, categories) => {
  if (!data) return [];

  // if user navigates to category

  if (categories) {
    const objValues = Object.values(data).flat();
    const ObjKeys = Object.keys(data);

    const filterObjects = objValues.filter((obj) => {
      const details = obj._embedded.details;
      const objCategory = details.type;

      const detailsValues = Object.values(details);

      /**
       * User clicks one category type (paintings/prints)
       ** User clicks one filter type
       ** User clicks several filter types
       * User clicks several category types
       ** user clicks one filter type
       ** user clicks several filter types
       */

      const productMustMatch = categories.every((e) => ObjKeys.includes(e)); // if only category (paintings/prints) is active
      if (productMustMatch) {
        // Only category is active (prints/paintings)
        return categories.includes(objCategory);
      } else {
        // If filter is active (set, single, etc.)

        // if all objKeys are active (paintings, prints)
        if (ObjKeys.every((e) => categories.includes(e))) {
          return (
            categories.some((e) => detailsValues.includes(e)) &&
            categories.includes(objCategory)
          );
          // if one objKey filter (paintings, prints) is active
        } else {
          return (
            categories.every((e) => detailsValues.includes(e)) &&
            categories.includes(objCategory)
          );
        }
      }
    });

    console.log(filterObjects);
    return filterObjects;
  }

  // if user has no active category
  return Object.values(data) // since fetched data-objects are all stored in varius arrays, we flatten them and sort them based on id
    .flat()
    .sort((a, b) => a.id - b.id);
};

export default dataHandler;
