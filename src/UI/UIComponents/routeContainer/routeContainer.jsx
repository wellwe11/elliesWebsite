import classes from "./routeContainer.module.scss";

import { Suspense } from "react";

import Footer from "../FOOTER/footer.jsx";
import Navbar from "../NAVBAR/navbar.jsx";

import MainPagesRoutes from "./components/mainPageRoutes/mainPageRoutes.jsx";
import BackgroundRoutes from "./components/backgroundRoutes/backgroundRoutes.jsx";
import useGetLocation from "@hooks/useGetLocation.jsx";
import Loading from "../LOADING/loading.jsx";

import { create } from "zustand";
import { Route, Routes } from "react-router-dom";

const tempObjectsInCart = {
  "This is a title for this set1112dsada223": {
    item: {
      image: "/serviceImages/collections/mainImageTwo.png",
      images: [
        {
          src: "/serviceImages/collections/mainImageOne.png",
          bio: "This is bio about itemOne",
        },
        {
          src: "/serviceImages/collections/mainImageTwo.png",
          bio: "This is bio about itemTwoasd",
        },
        {
          src: "/serviceImages/collections/mainImageThree.png",
          bio: "This is bio about itemThreeqwdf",
        },
      ],
      _embedded: {
        setTitle: "This is a title for this set23423",
        setDescription:
          "this is some text which contains information about tbhis text. For example, this set has a set of 3 images, and they are very nice. Please buy them because I really need money. I would use this money to paint more sets, which is what I love doing, thank",
        details: {
          colors: ["Blue", "White"],
          price: 14.99,
          height: 35,
          amount: 3,
          type: "paintings",
        },
        restImages: [
          "/serviceImages/collections/mainImageOne.png",
          "/serviceImages/collections/mainImageOne.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageOne.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
        ],
      },
      id: 1123123,
    },
    quantity: 9,
  },

  "This is a title for this set13231": {
    item: {
      image: "/serviceImages/collections/mainImageTwo.png",
      images: [
        {
          src: "/serviceImages/collections/mainImageOne.png",
          bio: "This is bio about itemOne",
        },
        {
          src: "/serviceImages/collections/mainImageTwo.png",
          bio: "This is bio about itemTwoasd",
        },
        {
          src: "/serviceImages/collections/mainImageThree.png",
          bio: "This is bio about itemThreeqwdf",
        },
      ],
      _embedded: {
        setTitle: "This is a title for this setasdawd12312",
        setDescription:
          "this is some text which contains information about tbhis text. For example, this set has a set of 3 images, and they are very nice. Please buy them because I really need money. I would use this money to paint more sets, which is what I love doing, thank",
        details: {
          colors: ["Blue", "White"],
          price: 14.99,
          height: 35,
          amount: 3,
          type: "paintings",
        },
        restImages: [
          "/serviceImages/collections/mainImageOne.png",
          "/serviceImages/collections/mainImageOne.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageOne.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
        ],
      },
      id: 1234234,
    },
    quantity: 9,
  },

  "This is a title for this set1sda11111234": {
    item: {
      image: "/serviceImages/collections/mainImageTwo.png",
      images: [
        {
          src: "/serviceImages/collections/mainImageOne.png",
          bio: "This is bio about itemOne",
        },
        {
          src: "/serviceImages/collections/mainImageTwo.png",
          bio: "This is bio about itemTwoasd",
        },
        {
          src: "/serviceImages/collections/mainImageThree.png",
          bio: "This is bio about itemThreeqwdf",
        },
      ],
      _embedded: {
        setTitle: "This is a title for this set456123543",
        setDescription:
          "this is some text which contains information about tbhis text. For example, this set has a set of 3 images, and they are very nice. Please buy them because I really need money. I would use this money to paint more sets, which is what I love doing, thank",
        details: {
          colors: ["Blue", "White"],
          price: 14.99,
          height: 35,
          amount: 3,
          type: "paintings",
        },
        restImages: [
          "/serviceImages/collections/mainImageOne.png",
          "/serviceImages/collections/mainImageOne.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageOne.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
        ],
      },
      id: 1345345,
    },
    quantity: 9,
  },
  "This is a title for this set123553253ss24234": {
    item: {
      image: "/serviceImages/collections/mainImageTwo.png",
      images: [
        {
          src: "/serviceImages/collections/mainImageOne.png",
          bio: "This is bio about itemOne",
        },
        {
          src: "/serviceImages/collections/mainImageTwo.png",
          bio: "This is bio about itemTwoasd",
        },
        {
          src: "/serviceImages/collections/mainImageThree.png",
          bio: "This is bio about itemThreeqwdf",
        },
      ],
      _embedded: {
        setTitle: "This is a title for this setqqqqdas23123",
        setDescription:
          "this is some text which contains information about tbhis text. For example, this set has a set of 3 images, and they are very nice. Please buy them because I really need money. I would use this money to paint more sets, which is what I love doing, thank",
        details: {
          colors: ["Blue", "White"],
          price: 14.99,
          height: 35,
          amount: 3,
          type: "paintings",
        },
        restImages: [
          "/serviceImages/collections/mainImageOne.png",
          "/serviceImages/collections/mainImageOne.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageOne.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
        ],
      },
      id: 1345345112312,
    },
    quantity: 9,
  },
  "This is a title for this set1412335qqwee": {
    item: {
      image: "/serviceImages/collections/mainImageTwo.png",
      images: [
        {
          src: "/serviceImages/collections/mainImageOne.png",
          bio: "This is bio about itemOne",
        },
        {
          src: "/serviceImages/collections/mainImageTwo.png",
          bio: "This is bio about itemTwoasd",
        },
        {
          src: "/serviceImages/collections/mainImageThree.png",
          bio: "This is bio about itemThreeqwdf",
        },
      ],
      _embedded: {
        setTitle: "This is a title for this setffffff",
        setDescription:
          "this is some text which contains information about tbhis text. For example, this set has a set of 3 images, and they are very nice. Please buy them because I really need money. I would use this money to paint more sets, which is what I love doing, thank",
        details: {
          colors: ["Blue", "White"],
          price: 14.99,
          height: 35,
          amount: 3,
          type: "paintings",
        },
        restImages: [
          "/serviceImages/collections/mainImageOne.png",
          "/serviceImages/collections/mainImageOne.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageOne.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
        ],
      },
      id: 1123123,
    },
    quantity: 9,
  },

  "This is a title for this set1456": {
    item: {
      image: "/serviceImages/collections/mainImageTwo.png",
      images: [
        {
          src: "/serviceImages/collections/mainImageOne.png",
          bio: "This is bio about itemOne",
        },
        {
          src: "/serviceImages/collections/mainImageTwo.png",
          bio: "This is bio about itemTwoasd",
        },
        {
          src: "/serviceImages/collections/mainImageThree.png",
          bio: "This is bio about itemThreeqwdf",
        },
      ],
      _embedded: {
        setTitle: "This is a title for this setsdwdasdsddq123",
        setDescription:
          "this is some text which contains information about tbhis text. For example, this set has a set of 3 images, and they are very nice. Please buy them because I really need money. I would use this money to paint more sets, which is what I love doing, thank",
        details: {
          colors: ["Blue", "White"],
          price: 14.99,
          height: 35,
          amount: 3,
          type: "paintings",
        },
        restImages: [
          "/serviceImages/collections/mainImageOne.png",
          "/serviceImages/collections/mainImageOne.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageOne.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
        ],
      },
      id: 1234234,
    },
    quantity: 9,
  },

  "This is a title for this set112323d": {
    item: {
      image: "/serviceImages/collections/mainImageTwo.png",
      images: [
        {
          src: "/serviceImages/collections/mainImageOne.png",
          bio: "This is bio about itemOne",
        },
        {
          src: "/serviceImages/collections/mainImageTwo.png",
          bio: "This is bio about itemTwoasd",
        },
        {
          src: "/serviceImages/collections/mainImageThree.png",
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
          amount: 3,
          type: "paintings",
        },
        restImages: [
          "/serviceImages/collections/mainImageOne.png",
          "/serviceImages/collections/mainImageOne.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageOne.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
        ],
      },
      id: 1345345,
    },
    quantity: 9,
  },
  "This is a title for this set121gfd": {
    item: {
      image: "/serviceImages/collections/mainImageTwo.png",
      images: [
        {
          src: "/serviceImages/collections/mainImageOne.png",
          bio: "This is bio about itemOne",
        },
        {
          src: "/serviceImages/collections/mainImageTwo.png",
          bio: "This is bio about itemTwoasd",
        },
        {
          src: "/serviceImages/collections/mainImageThree.png",
          bio: "This is bio about itemThreeqwdf",
        },
      ],
      _embedded: {
        setTitle: "This is a title for this seqq23341231wet",
        setDescription:
          "this is some text which contains information about tbhis text. For example, this set has a set of 3 images, and they are very nice. Please buy them because I really need money. I would use this money to paint more sets, which is what I love doing, thank",
        details: {
          colors: ["Blue", "White"],
          price: 14.99,
          height: 35,
          amount: 3,
          type: "paintings",
        },
        restImages: [
          "/serviceImages/collections/mainImageOne.png",
          "/serviceImages/collections/mainImageOne.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageOne.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
        ],
      },
      id: 13451234345,
    },
    quantity: 9,
  },
  "This is a title for this set1345234": {
    item: {
      image: "/serviceImages/collections/mainImageTwo.png",
      images: [
        {
          src: "/serviceImages/collections/mainImageOne.png",
          bio: "This is bio about itemOne",
        },
        {
          src: "/serviceImages/collections/mainImageTwo.png",
          bio: "This is bio about itemTwoasd",
        },
        {
          src: "/serviceImages/collections/mainImageThree.png",
          bio: "This is bio about itemThreeqwdf",
        },
      ],
      _embedded: {
        setTitle: "This is a title for this setqweqweasdasd",
        setDescription:
          "this is some text which contains information about tbhis text. For example, this set has a set of 3 images, and they are very nice. Please buy them because I really need money. I would use this money to paint more sets, which is what I love doing, thank",
        details: {
          colors: ["Blue", "White"],
          price: 14.99,
          height: 35,
          amount: 3,
          type: "paintings",
        },
        restImages: [
          "/serviceImages/collections/mainImageOne.png",
          "/serviceImages/collections/mainImageOne.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageOne.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
        ],
      },
      id: 1123123,
    },
    quantity: 9,
  },

  "This is a title for this set12323423453421": {
    item: {
      image: "/serviceImages/collections/mainImageTwo.png",
      images: [
        {
          src: "/serviceImages/collections/mainImageOne.png",
          bio: "This is bio about itemOne",
        },
        {
          src: "/serviceImages/collections/mainImageTwo.png",
          bio: "This is bio about itemTwoasd",
        },
        {
          src: "/serviceImages/collections/mainImageThree.png",
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
          amount: 3,
          type: "paintings",
        },
        restImages: [
          "/serviceImages/collections/mainImageOne.png",
          "/serviceImages/collections/mainImageOne.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageOne.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
        ],
      },
      id: 1234234,
    },
    quantity: 9,
  },

  "This is a title for this set13asdasd45qwdasd": {
    item: {
      image: "/serviceImages/collections/mainImageTwo.png",
      images: [
        {
          src: "/serviceImages/collections/mainImageOne.png",
          bio: "This is bio about itemOne",
        },
        {
          src: "/serviceImages/collections/mainImageTwo.png",
          bio: "This is bio about itemTwoasd",
        },
        {
          src: "/serviceImages/collections/mainImageThree.png",
          bio: "This is bio about itemThreeqwdf",
        },
      ],
      _embedded: {
        setTitle: "This is a title for this setwqfewefwef",
        setDescription:
          "this is some text which contains information about tbhis text. For example, this set has a set of 3 images, and they are very nice. Please buy them because I really need money. I would use this money to paint more sets, which is what I love doing, thank",
        details: {
          colors: ["Blue", "White"],
          price: 14.99,
          height: 35,
          amount: 3,
          type: "paintings",
        },
        restImages: [
          "/serviceImages/collections/mainImageOne.png",
          "/serviceImages/collections/mainImageOne.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageOne.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
        ],
      },
      id: 1345345,
    },
    quantity: 9,
  },
  "This is a title for this set5asw671": {
    item: {
      image: "/serviceImages/collections/mainImageTwo.png",
      images: [
        {
          src: "/serviceImages/collections/ma inImageOne.png",
          bio: "This is bio about itemOne",
        },
        {
          src: "/serviceImages/collections/mainImageTwo.png",
          bio: "This is bio about itemTwoasd",
        },
        {
          src: "/serviceImages/collections/mainImageThree.png",
          bio: "This is bio about itemThreeqwdf",
        },
      ],
      _embedded: {
        setTitle: "This is a title for this setqweqwsssssss",
        setDescription:
          "this is some text which contains information about tbhis text. For example, this set has a set of 3 images, and they are very nice. Please buy them because I really need money. I would use this money to paint more sets, which is what I love doing, thank",
        details: {
          colors: ["Blue", "White"],
          price: 14.99,
          height: 35,
          amount: 3,
          type: "paintings",
        },
        restImages: [
          "/serviceImages/collections/mainImageOne.png",
          "/serviceImages/collections/mainImageOne.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageOne.png",
          "/serviceImages/collections/mainImageTwo.png",
          "/serviceImages/collections/mainImageTwo.png",
        ],
      },
      id: 13453456354345,
    },
    quantity: 9,
  },
};

export const storeData = create((set, get) => ({
  cart: tempObjectsInCart,
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
  addToCart: (obj) =>
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
            [key]: { ...objExists, quantity: objExists.quantity + 1 },
          },
        };
      }

      return {
        cart: {
          ...state.cart,
          [key]: { item: obj, quantity: 1 },
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

const RouteContainer = () => {
  const { pathname, state } = useGetLocation();

  return (
    <div className={classes.widthContainer}>
      <Navbar />
      <div className={classes.whiteBackground} />

      <div className={`${classes.contentWrapper} ${classes.paddingClass}`}>
        <MainPagesRoutes />
        {state?.backgroundLocation && <BackgroundRoutes />}

        <Footer />
      </div>
    </div>
  );
};

export default RouteContainer;
