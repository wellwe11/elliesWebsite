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

// will fix for future - to use instead of uniqueImageContext
export const useDataZustand = create((set, get) => ({
  data: null,
  fetchData: async (d) => fetchDataAndAssignID(d),
  setData: (d) => set({ data: d }),
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
