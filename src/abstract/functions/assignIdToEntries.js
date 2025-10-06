const assignIdToEntries = (entries) => {
  const objEntries = Object.entries(entries);

  return Object.fromEntries(
    objEntries.map(([key, arr]) =>
      Array.isArray(arr)
        ? [key, arr.map((item, index) => ({ ...item, id: +index }))]
        : [key, arr]
    )
  );
};

export default assignIdToEntries;
