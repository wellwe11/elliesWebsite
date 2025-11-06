import classes from "./routeContainer.module.scss";

import { Suspense } from "react";

import Footer from "../FOOTER/footer.jsx";
import Navbar from "../NAVBAR/navbar.jsx";

import MainPagesRoutes from "./components/mainPageRoutes/mainPageRoutes.jsx";
import BackgroundRoutes from "./components/backgroundRoutes/backgroundRoutes.jsx";
import useGetLocation from "@hooks/useGetLocation.jsx";
import Loading from "../LOADING/loading.jsx";

import { Route, Routes } from "react-router-dom";

const RouteContainer = () => {
  const { pathname, state } = useGetLocation();

  return (
    <div className={classes.widthContainer}>
      <Navbar />
      {/* <div className={classes.whiteBackground} /> */}

      <div className={`${classes.contentWrapper} ${classes.paddingClass}`}>
        <MainPagesRoutes />
        {state?.backgroundLocation && <BackgroundRoutes />}

        <Footer />
      </div>
    </div>
  );
};

export default RouteContainer;
