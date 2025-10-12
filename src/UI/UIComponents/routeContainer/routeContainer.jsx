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
import fetchDataAndAssignID from "../../../abstract/functions/fetches/fetchDataAndAssignId.js";

export const useDataZustand = create((set, get) => ({
  isLoading: false,
  setIsLoading: (boolean) => set({ isLoading: boolean }),

  data: null,
  prevData: null,

  fetch: async (path) => {
    set({ isLoading: true });
    const previousData = get().data;

    set({ prevData: previousData });

    const localData = await fetchDataAndAssignID(path);

    if (localData) {
      set({
        isLoading: false,
        data: localData,
        prevData: null,
      });

      return true;
    } else {
      set({ isLoading: false, data: null, prevData: null });
      return false;
    }
  },
}));

const RouteContainer = () => {
  const [cart, setCart] = useState({}); // context for whichever product is in focus

  const { totalItems, totalPrice } = getTotalInfo(cart);

  const { state } = useGetLocation();

  const [fetchedData, setFetchedData] = useState(null);

  return (
    <div className={classes.widthContainer}>
      <Navbar cartItems={totalItems} setFetchedData={setFetchedData} />

      <div className={`${classes.contentWrapper} ${classes.paddingClass}`}>
        <UniqueImageContext.Provider
          value={{ cart, setCart, totalItems, totalPrice }}
        >
          <MainPagesRoutes data={fetchedData} />
          {state?.backgroundLocation && <BackgroundRoutes />}
        </UniqueImageContext.Provider>
        <Footer />
      </div>
    </div>
  );
};

export default RouteContainer;
