import classes from "./routeContainer.module.scss";

import { Suspense, useState } from "react";

import Footer from "../FOOTER/footer.jsx";
import Navbar from "../NAVBAR/navbar.jsx";

import cartContext from "../BODY/cartContext.jsx";

import getTotalInfo from "./functions/totalItems.js";

import MainPagesRoutes from "./components/mainPageRoutes/mainPageRoutes.jsx";
import BackgroundRoutes from "./components/backgroundRoutes/backgroundRoutes.jsx";
import useGetLocation from "@hooks/useGetLocation.jsx";
import Loading from "../LOADING/loading.jsx";

import { create } from "zustand";

// is for future, will store data in here to fetch it over the page
export const storeData = create((set) => ({
  data: null,
  setData: (d) => set({ data: d }),

  cart: {},
  setCart: (e) => set({ cart: e }),
}));

const RouteContainer = () => {
  const [cart, setCart] = useState({}); // context for whichever product is in focus

  const { totalItems, totalPrice } = getTotalInfo(cart);

  const { state } = useGetLocation();

  return (
    <div className={classes.widthContainer}>
      <Navbar cartItems={totalItems} />

      <div className={`${classes.contentWrapper} ${classes.paddingClass}`}>
        <cartContext.Provider value={{ cart, setCart, totalItems, totalPrice }}>
          <MainPagesRoutes />
          {state?.backgroundLocation && <BackgroundRoutes />}
        </cartContext.Provider>
        <Footer />
      </div>
    </div>
  );
};

export default RouteContainer;
