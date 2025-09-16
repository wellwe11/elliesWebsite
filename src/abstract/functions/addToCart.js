const addToCart = (setter, obj) => {
  // objects id is used as key for stacking objects having the same id
  // because each product has a unique id, we need to stack them to control them further in the cart and for more easily displayed products that are in cart
  const objId = obj.id;
  const objType = obj._embedded.details.type;

  const getterKey = `${objType} ${+objId}`;
  console.log(getterKey);

  setter((prev) => {
    const previousCart = { ...prev };

    if (!previousCart[getterKey]) {
      // if no key inside of previousCart has objId, make one
      previousCart[getterKey] = [];
    }

    previousCart[getterKey] = [...previousCart[getterKey], obj];
    return previousCart;
  });
};

export default addToCart;
