const dataHandler = (data, categories) => {
  if (!data) return [];

  const flattedDataSets = Object.values(data).flat(); // All sets with nested child-elements
  const flattedIndividualSets = flattedDataSets
    .map((obj) => {
      const { setTitle, setDescription, type } = obj;

      obj.setType = obj.set.length > 1 ? "set" : "single";
      obj.image = obj.setImages[0]; // select a default image
      obj.price = 0; // add a total price

      // if collection is a single item
      if (obj.set.length === 1) {
        const { price, colors, height, width } = obj.set[0].details,
          image = obj.set[0].image;

        const { set, ...newObj } = obj; // remove set as it is no longer needed

        return {
          ...newObj,
          price,
          image,
          colors,
          height,
          width,
        };
      }

      // if collection is a set
      if (obj.set.length > 1) {
        return obj.set.map((e, index) => {
          const productId = +`${obj.id}.${index}`;
          obj.price += e.details.price; // add to sets total price

          return {
            ...e,
            setTitle,
            setDescription,
            type,
            id: productId,
            setType: "single",
          };
        });
      }
    })
    .flat();

  // if user navigates to category
  if (categories) {
    const arr = [];
    const objValues = Object.values(data).flat();
    const ObjKeys = Object.keys(data);

    const categoryFilter = objValues.filter(
      (obj) =>
        categories.includes(obj.type) ||
        categories.includes(obj.set.some((e) => e.details))
    );

    if (categories.includes("single")) {
      arr.push(flattedIndividualSets);
    }

    if (categories.includes("set")) {
      arr.push(flattedDataSets);
    }

    arr.push(categoryFilter);

    return arr.flat();
  }

  return [flattedDataSets, flattedIndividualSets].flat();
};

export default dataHandler;
