import classes from "./routeContainer.module.scss";

import { Suspense } from "react";

import Footer from "../FOOTER/footer.jsx";
import Navbar from "../NAVBAR/navbar.jsx";

import MainPagesRoutes from "./components/mainPageRoutes/mainPageRoutes.jsx";
import BackgroundRoutes from "./components/backgroundRoutes/backgroundRoutes.jsx";
import useGetLocation from "@hooks/useGetLocation.jsx";
import Loading from "../LOADING/loading.jsx";

import { create } from "zustand";

// is for future, will store data in here to fetch it over the page
export const storeData = create((set) => ({
  cart: {},
  setCart: (e) => set({ cart: e }),

  totalItems: 0,
  setTotalItems: (e) => set({ totalItems: Object.values(e)?.flat()?.length }),

  totalPrice: 0,
  setTotalPrice: (e) => ({
    totalPrice: Object.values(e)
      .flat()
      .reduce((sum, item) => sum + item?._embedded?.details?.price, 0),
  }),
}));

const RouteContainer = () => {
  const { state } = useGetLocation();

  return (
    <div className={classes.widthContainer}>
      <Navbar />

      <div className={`${classes.contentWrapper} ${classes.paddingClass}`}>
        <MainPagesRoutes />
        {state?.backgroundLocation && <BackgroundRoutes />}

        <Footer />
      </div>
    </div>
  );
};

export default RouteContainer;
