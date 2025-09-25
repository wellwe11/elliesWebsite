const assignIdToObjects = (obj) => {
  return obj.map((item, index) => {
    // const id = crypto.randomUUID(); // for future!
    // const noLetters = id.replace(/D/g, "");
    // const otherId = index + " " + item._embedded.details.type;

    return {
      ...item,
      id: index,
    };
  });
};

export default assignIdToObjects;
