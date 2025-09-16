const addToCart = (setter, obj) => {
  // objects id is used as key for stacking objects having the same id
  // because each product has a unique id, we need to stack them to control them further in the cart and for more easily displayed products that are in cart
  const objName = obj._embedded.setTitle;

  setter((prev) => {
    const previousCart = { ...prev };

    if (!previousCart[objName]) {
      // if no key inside of previousCart has objId, make one
      previousCart[objName] = [];
    }

    previousCart[objName] = [...previousCart[objName], obj];
    return previousCart;
  });
};

export default addToCart;
