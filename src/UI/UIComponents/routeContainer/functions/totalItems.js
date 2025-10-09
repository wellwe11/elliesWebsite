const getTotalInfo = (obj) => {
  const totalItems = () => Object.values(obj)?.flat()?.length;

  const totalPrice = () =>
    Object.values(obj)
      .flat()
      .reduce((sum, item) => sum + item?._embedded?.details?.price, 0);

  return {
    totalItems,
    totalPrice,
  };
};

export default getTotalInfo;
