const assignIdToEntries = (entries) => {
  return Object.fromEntries(
    entries.map(([key, arr]) => [
      key,
      arr.map((item, index) => ({ ...item, id: +index })),
    ])
  );
};

export default assignIdToEntries;
