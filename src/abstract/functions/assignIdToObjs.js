const assignIdToObjects = (obj) => {
  return obj.map((item, index) => ({ ...item, id: +index }));
};

export default assignIdToObjects;
