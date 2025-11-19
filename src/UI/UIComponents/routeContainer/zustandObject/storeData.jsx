import { create } from "zustand";

const tempObj = {
  "This is a title for this set1": {
    item: {
      image: "/serviceImages/collections/blue/mainImageTwo.png",
      images: [
        {
          src: "/serviceImages/collections/blue/mainImageOne.png",
          bio: "This is bio about itemOne",
        },
        {
          src: "/serviceImages/collections/blue/mainImageTwo.png",
          bio: "This is bio about itemTwoasd",
        },
        {
          src: "/serviceImages/collections/blue/mainImageThree.png",
          bio: "This is bio about itemThreeqwdf",
        },
      ],
      _embedded: {
        setTitle: "This is a title for this set",
        setDescription:
          "this is some text which contains information about tbhis text. For example, this set has a set of 3 images, and they are very nice. Please buy them because I really need money. I would use this money to paint more sets, which is what I love doing, thank",
        details: {
          colors: ["Blue", "White"],
          price: 14.99,
          height: 35,
          width: 25,
          amount: 3,
          type: "paintings",
        },
        restImages: [
          "/serviceImages/collections/blue/mainImageOne.png",
          "/serviceImages/collections/blue/mainImageOne.png",
          "/serviceImages/collections/blue/mainImageTwo.png",
          "/serviceImages/collections/blue/mainImageTwo.png",
          "/serviceImages/collections/blue/mainImageTwo.png",
          "/serviceImages/collections/blue/mainImageTwo.png",
          "/serviceImages/collections/blue/mainImageOne.png",
          "/serviceImages/collections/blue/mainImageTwo.png",
          "/serviceImages/collections/blue/mainImageTwo.png",
        ],
      },
      id: 1,
    },
    quantity: 7,
  },
  "This is a title for this set2": {
    item: {
      image: "/serviceImages/collections/blue/mainImageTwo.png",
      images: [
        {
          src: "/serviceImages/collections/blue/mainImageOne.png",
          bio: "This is bio about itemOne",
        },
        {
          src: "/serviceImages/collections/blue/mainImageTwo.png",
          bio: "This is bio about itemTwoasd",
        },
        {
          src: "/serviceImages/collections/blue/mainImageThree.png",
          bio: "This is bio about itemThreeqwdf",
        },
      ],
      _embedded: {
        setTitle: "This is a title for this set",
        setDescription:
          "this is some text which contains information about tbhis text. For example, this set has a set of 3 images, and they are very nice. Please buy them because I really need money. I would use this money to paint more sets, which is what I love doing, thank",
        details: {
          colors: ["Blue", "White"],
          price: 14.99,
          height: 35,
          width: 25,
          amount: 3,
          type: "paintings",
        },
        restImages: [
          "/serviceImages/collections/blue/mainImageOne.png",
          "/serviceImages/collections/blue/mainImageOne.png",
          "/serviceImages/collections/blue/mainImageTwo.png",
          "/serviceImages/collections/blue/mainImageTwo.png",
          "/serviceImages/collections/blue/mainImageTwo.png",
          "/serviceImages/collections/blue/mainImageTwo.png",
          "/serviceImages/collections/blue/mainImageOne.png",
          "/serviceImages/collections/blue/mainImageTwo.png",
          "/serviceImages/collections/blue/mainImageTwo.png",
        ],
      },
      id: 2,
    },
    quantity: 5,
  },
  "This is a title for this set3": {
    item: {
      image: "/serviceImages/collections/blue/mainImageTwo.png",
      images: [
        {
          src: "/serviceImages/collections/blue/mainImageOne.png",
          bio: "This is bio about itemOne",
        },
        {
          src: "/serviceImages/collections/blue/mainImageTwo.png",
          bio: "This is bio about itemTwoasd",
        },
        {
          src: "/serviceImages/collections/blue/mainImageThree.png",
          bio: "This is bio about itemThreeqwdf",
        },
      ],
      _embedded: {
        setTitle: "This is a title for this set",
        setDescription:
          "this is some text which contains information about tbhis text. For example, this set has a set of 3 images, and they are very nice. Please buy them because I really need money. I would use this money to paint more sets, which is what I love doing, thank",
        details: {
          colors: ["Blue", "White"],
          price: 14.99,
          height: 35,
          width: 25,
          amount: 3,
          type: "paintings",
        },
        restImages: [
          "/serviceImages/collections/blue/mainImageOne.png",
          "/serviceImages/collections/blue/mainImageOne.png",
          "/serviceImages/collections/blue/mainImageTwo.png",
          "/serviceImages/collections/blue/mainImageTwo.png",
          "/serviceImages/collections/blue/mainImageTwo.png",
          "/serviceImages/collections/blue/mainImageTwo.png",
          "/serviceImages/collections/blue/mainImageOne.png",
          "/serviceImages/collections/blue/mainImageTwo.png",
          "/serviceImages/collections/blue/mainImageTwo.png",
        ],
      },
      id: 3,
    },
    quantity: 5,
  },
  "This is a title for this set4": {
    item: {
      image: "/serviceImages/collections/blue/mainImageTwo.png",
      images: [
        {
          src: "/serviceImages/collections/blue/mainImageOne.png",
          bio: "This is bio about itemOne",
        },
        {
          src: "/serviceImages/collections/blue/mainImageTwo.png",
          bio: "This is bio about itemTwoasd",
        },
        {
          src: "/serviceImages/collections/blue/mainImageThree.png",
          bio: "This is bio about itemThreeqwdf",
        },
      ],
      _embedded: {
        setTitle: "This is a title for this set",
        setDescription:
          "this is some text which contains information about tbhis text. For example, this set has a set of 3 images, and they are very nice. Please buy them because I really need money. I would use this money to paint more sets, which is what I love doing, thank",
        details: {
          colors: ["Blue", "White"],
          price: 14.99,
          height: 35,
          width: 25,
          amount: 3,
          type: "paintings",
        },
        restImages: [
          "/serviceImages/collections/blue/mainImageOne.png",
          "/serviceImages/collections/blue/mainImageOne.png",
          "/serviceImages/collections/blue/mainImageTwo.png",
          "/serviceImages/collections/blue/mainImageTwo.png",
          "/serviceImages/collections/blue/mainImageTwo.png",
          "/serviceImages/collections/blue/mainImageTwo.png",
          "/serviceImages/collections/blue/mainImageOne.png",
          "/serviceImages/collections/blue/mainImageTwo.png",
          "/serviceImages/collections/blue/mainImageTwo.png",
        ],
      },
      id: 4,
    },
    quantity: 5,
  },
  "This is a title for this set5": {
    item: {
      image: "/serviceImages/collections/blue/mainImageTwo.png",
      images: [
        {
          src: "/serviceImages/collections/blue/mainImageOne.png",
          bio: "This is bio about itemOne",
        },
        {
          src: "/serviceImages/collections/blue/mainImageTwo.png",
          bio: "This is bio about itemTwoasd",
        },
        {
          src: "/serviceImages/collections/blue/mainImageThree.png",
          bio: "This is bio about itemThreeqwdf",
        },
      ],
      _embedded: {
        setTitle: "This is a title for this set",
        setDescription:
          "this is some text which contains information about tbhis text. For example, this set has a set of 3 images, and they are very nice. Please buy them because I really need money. I would use this money to paint more sets, which is what I love doing, thank",
        details: {
          colors: ["Blue", "White"],
          price: 14.99,
          height: 35,
          width: 25,
          amount: 3,
          type: "paintings",
        },
        restImages: [
          "/serviceImages/collections/blue/mainImageOne.png",
          "/serviceImages/collections/blue/mainImageOne.png",
          "/serviceImages/collections/blue/mainImageTwo.png",
          "/serviceImages/collections/blue/mainImageTwo.png",
          "/serviceImages/collections/blue/mainImageTwo.png",
          "/serviceImages/collections/blue/mainImageTwo.png",
          "/serviceImages/collections/blue/mainImageOne.png",
          "/serviceImages/collections/blue/mainImageTwo.png",
          "/serviceImages/collections/blue/mainImageTwo.png",
        ],
      },
      id: 5,
    },
    quantity: 5,
  },
};

export const storeData = create((set, get) => ({
  cart: tempObj,
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
      totalPrice =
        totalPrice + +item?.item?._embedded?.details?.price * +item.quantity;
    });

    return totalPrice;
  },

  getItemId: (obj) => obj._embedded.setTitle + obj.id, // will change in future to setTitle only

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
                objExists.quantity > 100 ||
                objExists.quantity + 1 > 100 ||
                objExists.quantity + amount > 100
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
      } else {
        return {
          cart: {
            ...state.cart,
            [key]: { ...item, quantity: amount },
          },
        };
      }
    }),
}));

export default storeData;
