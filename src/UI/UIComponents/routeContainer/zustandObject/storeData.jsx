import { create } from "zustand";

export const storeData = create((set, get) => ({
  cart: {},
  setCart: (e) => set({ cart: e }),

  getTotalItems: () => {
    const cartItems = get().cart;

    const cartValues = Object.values(cartItems);

    if (cartValues.length < 1) return 0;

    let totalItems = 0;
    cartValues.forEach((item) => {
      totalItems = totalItems + item.quantity;
    });

    return totalItems;
  },

  getTotalPrice: () => {
    const cartItems = get().cart;

    const cartValues = Object.values(cartItems);

    if (cartValues.length < 1) return 0;

    let totalPrice = 0;

    cartValues.forEach((item) => {
      totalPrice = totalPrice + +item?.item?.price * +item.quantity;
    });

    return totalPrice;
  },

  getItemId: (obj) => obj.setTitle + obj.id, // will change in future to setTitle only

  // function which checks if item exists in state & adds objects to the state-array
  addToCart: (obj, amount) =>
    set((state) => {
      if (!obj || typeof obj !== "object") {
        throw new Error("Argument must be a product object in 'addToCart'");
      }

      const key = state.getItemId(obj);
      const objExists = state.cart[key];

      if (objExists) {
        return {
          cart: {
            ...state.cart,
            [key]: {
              ...objExists,
              quantity:
                objExists.quantity > 99 ||
                objExists.quantity + 1 > 99 ||
                objExists.quantity + amount > 99
                  ? 99
                  : objExists.quantity + +amount || objExists.quantity + 1,
            },
          },
        };
      }

      return {
        cart: {
          ...state.cart,
          [key]: { item: obj, quantity: amount || 1 },
        },
      };
    }),

  // function that checks if state-array is long enough to exist, if so remove object from array, otherwise, remove entire state
  removeFromCart: (obj) =>
    set((state) => {
      if (!obj || typeof obj !== "object") {
        throw new Error(
          "Argument must be the array in which object is located in; 'removeFromCart'"
        );
      }

      const key = state.getItemId(obj);
      const item = state.cart[key];
      const amount = item.quantity;

      if (amount > 1) {
        return {
          cart: {
            ...state.cart,
            [key]: { ...item, quantity: item.quantity - 1 },
          },
        };
      } else {
        const { [key]: _, ...restOfCart } = state.cart;

        return {
          cart: restOfCart,
        };
      }
    }),

  // function which takes amount from Input and updates the setter accordingly
  changeFromInputToCart: (obj, amount) =>
    set((state) => {
      if (!obj || typeof obj !== "object") {
        throw new Error(
          "First argument must be a product object in 'changeFromInputToCart'"
        );
      }

      if (typeof amount !== "number") {
        throw new Error(
          "Second argument must be a number 'changeFromInputToCart"
        );
      }

      const key = state.getItemId(obj);
      const item = state.cart[key];

      // If amount <= 0, remove product from cart entirely
      if (amount <= 0) {
        const { [key]: _, ...restOfCart } = state.cart;
        return {
          cart: restOfCart,
        };
      } else if (amount < 100) {
        return {
          cart: {
            ...state.cart,
            [key]: { ...item, quantity: amount },
          },
        };
      } else {
        return {
          cart: {
            ...state.cart,
            [key]: { ...item, quantity: 99 },
          },
        };
      }
    }),
}));

export default storeData;
