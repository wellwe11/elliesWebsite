import classes from "./SCREENCONTAINER.module.scss";

import { useLocation } from "react-router-dom";
import { useState } from "react";

import Footer from "../FOOTER/footer";
import Navbar from "../NAVBAR/navbar";

import UniqueImageContext from "../BODY/cartContext";

import getTotalInfo from "./functions/totalItems.js";

import MainPagesRoutes from "./components/mainPageRoutes/mainPageRoutes.jsx";
import BackgroundRoutes from "./components/backgroundRoutes/backgroundRoutes.jsx";

const ScreenContainer = () => {
  const [cart, setCart] = useState({}); // context for whichever product is in focus

  const { totalItems, totalPrice } = getTotalInfo(cart);

  const location = useLocation(),
    state = location.state;

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

export default ScreenContainer;
