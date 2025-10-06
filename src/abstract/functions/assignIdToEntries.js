const assignIdToEntries = (entries) => {
  const objEntries = Object.entries(entries);
  return Object.fromEntries(
    objEntries.map(([key, arr]) => [
      key,
      arr.map((item, index) => ({ ...item, id: +index })),
    ])
  );
};

export default assignIdToEntries;
