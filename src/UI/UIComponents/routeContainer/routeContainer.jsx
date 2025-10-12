import classes from "./routeContainer.module.scss";

import { Suspense, useState } from "react";

import { create } from "zustand";

import Footer from "../FOOTER/footer.jsx";
import Navbar from "../NAVBAR/navbar.jsx";

import UniqueImageContext from "../BODY/cartContext.jsx";

import getTotalInfo from "./functions/totalItems.js";

import MainPagesRoutes from "./components/mainPageRoutes/mainPageRoutes.jsx";
import BackgroundRoutes from "./components/backgroundRoutes/backgroundRoutes.jsx";
import useGetLocation from "@hooks/useGetLocation.jsx";
import Loading from "../LOADING/loading.jsx";

export const useDataZustand = create((set, get) => ({
  isLoading: false,
  setIsLoading: (boolean) => set({ isLoading: boolean }),

  data: null,
  setData: (d) => set({ data: d }),
  fetchData: async (path) => {
    set({ isLoading: true, data: null });
    try {
      const response = await fetch(path);

      if (!response.ok) {
        console.error("Failed to fetch data");
        set({ data: null, isLoading: false });
        return false;
      }

      const JSONData = await response.json();

      if (JSONData) {
        set({ data: JSONData, isLoading: false });
        return true;
      } else {
        set({ isLoading: false, data: null });
        return false;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  },
}));

const RouteContainer = () => {
  const [cart, setCart] = useState({}); // context for whichever product is in focus

  const { totalItems, totalPrice } = getTotalInfo(cart);

  const { state } = useGetLocation();

  return (
    <div className={classes.widthContainer}>
      <Navbar cartItems={totalItems} />

      <div className={`${classes.contentWrapper} ${classes.paddingClass}`}>
        <UniqueImageContext.Provider
          value={{ cart, setCart, totalItems, totalPrice }}
        >
          <MainPagesRoutes />
          {state?.backgroundLocation && <BackgroundRoutes />}
        </UniqueImageContext.Provider>
        <Footer />
      </div>
    </div>
  );
};

export default RouteContainer;
