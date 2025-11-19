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
      console.log(detailsWithoutType);

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
        console.log(1);
        // Only category is active (prints/paintings)
        return categories.includes(objCategory);
      } else {
        console.log(2);
        // If filter is active (set, single, etc.)

        // if all objKeys are active (paintings, prints)
        if (ObjKeys.every((e) => categories.includes(e))) {
          console.log(2.1);

          return (
            categories.some((e) => detailsValues.includes(e)) &&
            categories.includes(objCategory)
          );
          // if one objKey filter (paintings, prints) is active
        } else {
          console.log(2.2);

          return !ObjKeys.some((e) => categories.includes(e))
            ? categories.some((e) => detailsValues.includes(e))
            : categories.some((e) => detailsValues.includes(e)) &&
                categories.includes(objCategory);
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
