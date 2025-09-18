// -- @ts-check -- will add in future, need to learn typescript first :D

// function which checks if item exists in state & adds objects to the state-array
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
    const previousCart = { ...prev }; // shallow copy

    if (!previousCart[key]) {
      // if no key inside of previousCart has objId, make one
      previousCart[key] = [];
    }

    previousCart[key] = [...previousCart[key], obj];
    return previousCart;
  });
};

// function that checks if state-array is long enough to exist, if so remove object from array, otherwise, remove entire state
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

  // objects id is used as key for stacking objects having the same id
  // because each product has a unique id, we need to stack them to control them further in the cart and for more easily displayed products that are in cart
  const key = obj[0]._embedded.setTitle + obj[0].id;

  setter((prevCart) => {
    const newCart = { ...prevCart }; // shallow copy

    if (newCart[key]?.length > 1) {
      newCart[key] = [...newCart[key]]; // copy array
      newCart[key].pop(); // remove last item from array
    } else {
      delete newCart[key];
    }

    return newCart;
  });
};

// function which takes amount from Input and updates the setter accordingly
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
    throw new Error("Third argument must be a number 'changeFromInputToCart");
  }

  // objects id is used as key for stacking objects having the same id
  // because each product has a unique id, we need to stack them to control them further in the cart and for more easily displayed products that are in cart
  const key = obj[0]._embedded.setTitle + obj[0].id;

  // If amount <= 0, remove product from cart entirely
  if (amount <= 0) {
    setter((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[key];
      return newCart;
    });

    return;
  }

  setter((prevCart) => {
    const newCart = { ...prevCart };
    const currentArr = newCart[key] || [];
    const objLength = currentArr.length;

    if (amount > objLength) {
      // user increases amount
      // add missing items

      const toAdd = Array(amount - objLength).fill(obj[0]); // new array filled with obj[0]
      newCart[key] = [...currentArr, ...toAdd];
    } else if (amount < objLength) {
      // user decreases amount
      // remove extended items

      newCart[key] = currentArr.slice(0, amount);
    }

    // if same amount as previously, return the same
    return newCart;
  });
};
