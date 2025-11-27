import classes from "./routeContainer.module.scss";

import { Suspense, lazy, useState } from "react";

import Footer from "../FOOTER/footer.jsx";
import Navbar from "../NAVBAR/navbar.jsx";
const Cart = lazy(() => import("../cart/cart.jsx"));

import MainPagesRoutes from "./components/mainPageRoutes/mainPageRoutes.jsx";
const BackgroundRoutes = lazy(() =>
  import("./components/backgroundRoutes/backgroundRoutes.jsx")
);
import Loading from "../LOADING/loading.jsx";

import { Route, Routes, useLocation } from "react-router-dom";

const RouteContainer = () => {
  const location = useLocation();
  const backgroundLocations = location.state;
  const [displayShoppingCart, setDisplayShoppingCart] = useState(false);

  return (
    <div className={classes.widthContainer}>
      <Navbar setDisplayShoppingCart={setDisplayShoppingCart} />
      <Cart
        displayShoppingCart={displayShoppingCart}
        setDisplayShoppingCart={setDisplayShoppingCart}
      />

      <div className={`${classes.contentWrapper} ${classes.paddingClass}`}>
        <MainPagesRoutes location={location} state={backgroundLocations} />
        {backgroundLocations && <BackgroundRoutes />}

        <Footer />
      </div>
    </div>
  );
};

export default RouteContainer;
