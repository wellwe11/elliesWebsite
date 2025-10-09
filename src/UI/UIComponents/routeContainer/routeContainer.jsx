import classes from "./routeContainer.module.scss";

import { useEffect, useLayoutEffect, useState } from "react";

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

  const { pathname, state, location } = useGetLocation();

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [pageLoadedLocation, setPageLoadedLocation] = useState(pathname);

  useLayoutEffect(() => {
    const pageLocation = isLoading ? state || location : location;

    if (pathname !== state?.loadingPage) {
      setPageLoadedLocation(pageLocation);
    }
  }, [isLoading]);

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
            pageLoadedLocation={pageLoadedLocation}
            setIsError={setIsError}
            setIsLoading={setIsLoading}
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
