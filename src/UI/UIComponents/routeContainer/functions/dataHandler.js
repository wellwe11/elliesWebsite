// fixObjects rebuilds data into more readable and flexible objects.
// Data that is fetched contains both parent-objects as well as child-objects which needs to be flatted out for user-filtering

const CopyData = (data) => {
  const flattedDataSets = Object.values(data).flat();
  return JSON.parse(JSON.stringify(flattedDataSets));
};

const removeProperty = (obj, propertyToRemove) => {
  const { [propertyToRemove]: discarded, ...rest } = obj;

  return rest;
};

const extractKeys = (obj, ...keysToExtract) => {
  const extractedDetails = {};

  keysToExtract.forEach((key) => {
    if (obj.hasOwnProperty(key)) {
      extractedDetails[key] = obj[key];
    }
  });

  return extractedDetails;
};

const extractDetailsFromChildren = (obj) => {
  const details = obj.collection[0].details;
  const image = obj.collection[0].image;

  const extractedKeys = extractKeys(
    details,
    "price",
    "colors",
    "height",
    "width"
  );

  const newObj = removeProperty(obj, "collection");

  return {
    ...newObj,
    ...extractedKeys,
    image,
  };
};

const extractDetailsFromParent = (obj) => {
  const extractedKeys = extractKeys(obj, "setTitle", "setDescription", "type");

  return obj.collection.map((e, index) => {
    const productId = `${obj.id}.${index}`;

    return {
      ...e,
      ...extractedKeys,
      id: productId,
      set: "single",
    };
  });
};

const extractFromCollection = (data) => {
  // individual nested objects
  return data
    .map((obj) => {
      const isCollection = obj.collection.length > 1;

      const totalPrice = obj.collection.reduce(
        (acc, item) => acc + item.details.price,
        0
      );

      const updatedObj = {
        ...obj,
        set: isCollection ? "set" : "single",
        image: obj.setImages[0],
        price: totalPrice,
      };

      // if obeject is a single item. I.e. item of a collection
      if (!isCollection) {
        // extract child-details so parent can display matching information
        return extractDetailsFromChildren(updatedObj);
      }

      // if obj is a collection
      if (isCollection) {
        // apply details from parent-object so children can have matching set-information
        return extractDetailsFromParent(updatedObj);
      }
    })
    .flat();
};

const fixObjects = (data) => {
  const deepCopyDataSets = CopyData(data);
  const flattedIndividualSets = extractFromCollection(deepCopyDataSets);

  // for tomorrow: need to handle sets:
  // All objects should be displayable at same time, meaning, they all need individual ids (applied before filtering/using aboive functions)

  const collectionSets = deepCopyDataSets.filter((obj) => obj.set === "set");

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

  // single filter used
  if (categories.includes("single") && !categories.includes("set")) {
    const { flattedIndividualSets } = fixObjects(isFilterActive ? arr : data);

    return flattedIndividualSets.flat();
  }

  // set filter used
  if (categories.includes("set") && !categories.includes("single")) {
    const { collectionSets } = fixObjects(isFilterActive ? arr : data);
    return collectionSets.flat();
  }

  const { collectionSets, flattedIndividualSets } = fixObjects(
    isFilterActive ? arr : data
  );

  return [collectionSets, flattedIndividualSets].flat();
};

export default dataHandler;
