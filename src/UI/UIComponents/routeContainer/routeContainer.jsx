import classes from "./routeContainer.module.scss";

import { useLayoutEffect, useState } from "react";

import Footer from "../FOOTER/footer.jsx";
import Navbar from "../NAVBAR/navbar.jsx";

import UniqueImageContext from "../BODY/cartContext.jsx";

import getTotalInfo from "./functions/totalItems.js";

import MainPagesRoutes from "./components/mainPageRoutes/mainPageRoutes.jsx";
import BackgroundRoutes from "./components/backgroundRoutes/backgroundRoutes.jsx";
import useGetLocation from "@hooks/useGetLocation.jsx";
import Loading from "../LOADING/loading.jsx";

const RouteContainer = () => {
  const [cart, setCart] = useState({}); // context for whichever product is in focus

  const { totalItems, totalPrice } = getTotalInfo(cart);

  const { state, location } = useGetLocation();

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // console.log(pageLoadedLocation);

  // while isLoading, display old page with clickerEvent: none;

  return (
    <div className={classes.widthContainer}>
      <Navbar cartItems={totalItems} />

      <div className={`${classes.contentWrapper} ${classes.paddingClass}`}>
        <UniqueImageContext.Provider
          value={{ cart, setCart, totalItems, totalPrice }}
        >
          <MainPagesRoutes
            setIsError={setIsError}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
          {state?.backgroundLocation && (
            <BackgroundRoutes
              setIsError={setIsError}
              setIsLoading={setIsLoading}
            />
          )}
        </UniqueImageContext.Provider>
        <Footer />
      </div>
    </div>
  );
};

export default RouteContainer;
