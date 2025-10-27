import classes from "./routeContainer.module.scss";

import { Suspense, useEffect, useRef, useState } from "react";

import Footer from "../FOOTER/footer.jsx";
import Navbar from "../NAVBAR/navbar.jsx";

import MainPagesRoutes from "./components/mainPageRoutes/mainPageRoutes.jsx";
import BackgroundRoutes from "./components/backgroundRoutes/backgroundRoutes.jsx";
import useGetLocation from "@hooks/useGetLocation.jsx";
import Loading from "../LOADING/loading.jsx";

import { create } from "zustand";
import { Route, Routes } from "react-router-dom";

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

  console.log(pathname);
  const intersectingNavbarRef = useRef();
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (pathname !== "/") return isIntersecting(true);

    const element = intersectingNavbarRef.current;

    const observer = new IntersectionObserver((entry, observer) => {
      const firstEl = entry[0];

      if (firstEl.isIntersecting) {
        setIsIntersecting(true);
      } else {
        setIsIntersecting(false);
      }
    });

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }

      observer.disconnect();
    };
  }, []);

  return (
    <div className={classes.widthContainer}>
      <div
        className={`${classes.navbarWrapper} ${
          isIntersecting ? classes.isIntersecting : classes.isNotIntersecting
        }`}
      >
        <Navbar />
      </div>
      <div
        className={classes.intersectingNavbarRef}
        ref={intersectingNavbarRef}
      />
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
