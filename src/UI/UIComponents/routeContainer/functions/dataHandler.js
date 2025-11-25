const fixObjects = (data) => {
  const flattedDataSets = Object.values(data).flat();

  const collectionSets = flattedDataSets.filter((obj) => obj.set === "set");

  // individual nested objects
  const flattedIndividualSets = flattedDataSets
    .map((obj) => {
      const { setTitle, setDescription, type } = obj;

      obj.set = obj.collection.length > 1 ? "set" : "single";
      obj.image = obj.setImages[0]; // select a default image
      obj.price = 0; // add a total price

      // if collection is a single item
      if (obj.collection.length === 1) {
        const { price, colors, height, width } = obj.collection[0].details,
          image = obj.collection[0].image;

        const { collection, ...newObj } = obj; // remove set as it is no longer needed

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
      if (obj.collection.length > 1) {
        return obj.collection.map((e, index) => {
          const productId = +`${obj.id}.${index}`;
          obj.price += e.details.price; // add to sets total price

          return {
            ...e,
            setTitle,
            setDescription,
            type,
            id: productId,
            set: "single",
          };
        });
      }
    })
    .flat();

  return { collectionSets, flattedIndividualSets };
};

const dataHandler = (data, categories) => {
  if (!data) return [];

  if (!categories) {
    const { collectionSets, flattedIndividualSets } = fixObjects(data);
    return [collectionSets, flattedIndividualSets].flat();
  }

  const arr = [];

  for (const key in data) {
    if (categories.includes(key)) {
      arr.push(data[key]);
    }
  }

  let isFilterActive = arr.flat().length > 0;

  if (categories.includes("single") && !categories.includes("set")) {
    const { flattedIndividualSets } = fixObjects(isFilterActive ? arr : data);
    return flattedIndividualSets.flat();
  }

  if (categories.includes("set") && !categories.includes("single")) {
    const { collectionSets } = fixObjects(isFilterActive ? arr : data);

    return collectionSets.flat();
  }

  const { collectionSets, flattedIndividualSets } = fixObjects(arr);
  return [collectionSets, flattedIndividualSets].flat();
};

export default dataHandler;
