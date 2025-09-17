// -- @ts-check -- will add in future, need to learn typescript first :D

export const addToCart = (setter, obj) => {
  if (typeof setter !== "function") {
    throw new Error("First argument must be a setter function in 'addToCart'");
  }
  if (!obj || typeof obj !== "object") {
    throw new Error(
      "Second argument must be one product object in 'addToCart'"
    );
  }

  // objects id is used as key for stacking objects having the same id
  // because each product has a unique id, we need to stack them to control them further in the cart and for more easily displayed products that are in cart
  const key = obj._embedded.setTitle + obj.id; // will change in future to setTitle only

  setter((prev) => {
    const previousCart = { ...prev }; // create shallow copy of top layer keys/values

    if (!previousCart[key]) {
      // if no key inside of previousCart has objId, make one
      previousCart[key] = [];
    }

    previousCart[key] = [...previousCart[key], obj];
    return previousCart;
  });
};

export const removeFromCart = (setter, obj) => {
  if (typeof setter !== "function") {
    throw new Error(
      "First argument must be a setter function in 'removeFromCart'"
    );
  }
  if (!obj || typeof obj !== "object") {
    throw new Error(
      "Second argument must be the array in which object is located in; 'removeFromCart'"
    );
  }

  const key = obj[0]._embedded.setTitle + obj[0].id; // temp key, will change in future

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

export const changeFromInputToCart = (setter, obj, amount) => {
  if (typeof setter !== "function") {
    throw new Error(
      "First argument must be a setter function in 'changeFromInputToCart'"
    );
  }

  if (!obj || typeof obj !== "object") {
    throw new Error(
      "Second argument must be a product object in 'changeFromInputToCart'"
    );
  }

  if (typeof amount !== "number") {
    throw new Error(
      "Third argument must be a number; higher than 0 in 'changeFromInputToCart"
    );
  }

  const key = obj[0]._embedded.setTitle + obj[0].id; // temp key, will change in future
  if (amount <= 0) {
    setter((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[key];
      return newCart;
    });
  } else {
    const objLength = obj?.length;
    const difference = amount - objLength;

    if (amount > objLength) {
      const localArr = [];

      for (let i = 0; i < difference; i++) {
        localArr.push(obj[0]);
      }

      setter((prevCart) => {
        const previousCart = { ...prevCart }; // shallow copy of the array
        previousCart[key] = [...previousCart[key].concat(localArr)]; // merge arrays into a copy of previousCart
        return previousCart;
      });
    }

    if (amount < objLength) {
      setter((prevCart) => {
        const previousCart = { ...prevCart };
        previousCart[key] = [...previousCart[key]].slice(0, difference);

        console.log(previousCart[key].slice(0, difference));

        return previousCart;
      });
    }
  }
};
