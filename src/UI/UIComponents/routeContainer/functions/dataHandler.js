// fixObjects rebuilds data into more readable and flexible objects.
// Data that is fetched contains both parent-objects as well as child-objects which needs to be flatted out for user-filtering

const CopyData = (data) => {
  const flattedDataSets = Object.values(data).flat();
  return JSON.parse(JSON.stringify(flattedDataSets));
};

const addIdToChildObjects = (data) => {
  return data.forEach((obj) => {
    const totalPrice = obj.collection.reduce(
      (acc, curr) => acc + curr.price,
      0
    );

    const totalColors = [
      ...new Set(obj.collection.flatMap((child) => child.colors)),
    ];

    obj.set = "set";
    obj.price = totalPrice;
    obj.colors = totalColors;
    obj.width = obj.collection[0].width;
    obj.height = obj.collection[0].height;
    obj.image = obj.setImages[0];

    return obj.collection.forEach((child, index) => {
      child.id = +`${obj.id}.${index}`;
      child.set = "single";
      child.setTitle = obj.setTitle;
      child.setDescription = obj.setDescription;
      child.type = obj.type;
      return;
    });
  });
};

const liftUpSingleChildren = (data) => {
  return data.map((obj) => {
    if (obj.collection.length < 2) {
      const objSetItem = obj.collection[0];
      const { collection, ...rest } = obj;

      const newObj = {
        ...rest,
        ...objSetItem,
        id: +`${obj.id}.${1}`,
      };

      return newObj;
    } else {
      return obj;
    }
  });
};

const childElements = (data) => {
  return data.map((obj) => obj.collection || obj).flat();
};

const setElements = (data) => {
  return data.filter((obj) => obj.collection);
};

const fixObjects = (data) => {
  // deepcopy data
  const deepCopyDataSets = CopyData(data);

  addIdToChildObjects(deepCopyDataSets);
  const updatedArray = liftUpSingleChildren(deepCopyDataSets);

  const childEl = childElements(updatedArray);
  const setEl = setElements(updatedArray);

  return { childEl, setEl };
};

const dataHandler = (data, filters) => {
  if (!data) return [];

  // no filter is active
  if (!filters) {
    const { childEl, setEl } = fixObjects(data);

    return [childEl, setEl].flat();
  }

  const arr = [];
  // if data keys such as paintings, prints is in categories(filters)
  for (const key in data) {
    if (filters.includes(key)) {
      arr.push(data[key]);
    }
  }

  let isFilterActive = arr.flat().length > 0;

  // single filter used
  if (filters.includes("single") && !filters.includes("set")) {
    const { childEl } = fixObjects(isFilterActive ? arr : data);

    return childEl.flat();
  }

  // set filter used
  if (filters.includes("set") && !filters.includes("single")) {
    const { setEl } = fixObjects(isFilterActive ? arr : data);
    return setEl.flat();
  }

  const { childEl, setEl } = fixObjects(isFilterActive ? arr : data);

  return [childEl, setEl].flat();
};

export default dataHandler;
