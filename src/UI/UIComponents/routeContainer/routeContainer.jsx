import classes from "./routeContainer.module.scss";

import { useState } from "react";

import Footer from "../FOOTER/footer.jsx";
import Navbar from "../NAVBAR/navbar.jsx";

import UniqueImageContext from "../BODY/cartContext.jsx";

import getTotalInfo from "./functions/totalItems.js";

import MainPagesRoutes from "./components/mainPageRoutes/mainPageRoutes.jsx";
import BackgroundRoutes from "./components/backgroundRoutes/backgroundRoutes.jsx";
import useGetLocation from "@hooks/useLocation.jsx";
import Loading from "../LOADING/loading.jsx";

const RouteContainer = () => {
  const [cart, setCart] = useState({}); // context for whichever product is in focus

  const { totalItems, totalPrice } = getTotalInfo(cart);

  const { state } = useGetLocation();

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // while isLoading, display old page with clickerEvent: none;

  console.log(isLoading);

  return (
    <div className={classes.widthContainer}>
      {isLoading && <Loading />}

      <Navbar cartItems={totalItems} />

      <div className={`${classes.contentWrapper} ${classes.paddingClass}`}>
        <UniqueImageContext.Provider
          value={{ cart, setCart, totalItems, totalPrice }}
        >
          <MainPagesRoutes
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
