const flattenObjects = (data) => {
  return Object.values(data)
    .flat()
    .sort((a, b) => a.id - b.id);
};

export default flattenObjects;
