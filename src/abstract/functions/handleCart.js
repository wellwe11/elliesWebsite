export const addToCart = (setter, obj) => {
  // objects id is used as key for stacking objects having the same id
  // because each product has a unique id, we need to stack them to control them further in the cart and for more easily displayed products that are in cart
  const objName = obj._embedded.setTitle + obj.id; // will change in future to setTitle only

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

export const removeFromCart = (setter, item) => {
  const key = item[0]._embedded.setTitle + item[0].id; // temp key, will change in future

  setter((prevCart) => {
    const newCart = { ...prevCart }; // create shallow copy of top layer keys/values

    if (newCart[key]?.length > 1) {
      newCart[key] = [...newCart[key]]; // copy array
      newCart[key].pop(); // remove last item from array
    } else {
      delete newCart[key];
    }

    return newCart;
  });
};
