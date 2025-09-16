const addToCart = (setter, obj) => {
  // objects id is used as key for stacking objects having the same id
  // because each product has a unique id, we need to stack them to control them further in the cart and for more easily displayed products that are in cart
  const objId = obj.id;

  setter((prev) => {
    const previousCart = { ...prev };

    if (!previousCart[objId]) {
      // if no key inside of previousCart has objId, make one
      previousCart[objId] = [];
    }

    previousCart[objId] = [...previousCart[objId], obj];
    return previousCart;
  });
};

export default addToCart;
