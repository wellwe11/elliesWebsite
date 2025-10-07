import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import classes from "./SCREENCONTAINER.module.scss";

import Footer from "../FOOTER/footer";
import Navbar from "../NAVBAR/navbar";
import Home from "../BODY/home/HOME";
import UniqueImage from "../BODY/uniqueImagePage/uniqueImage";

import UniqueImageContext from "../BODY/cartContext";
import Gallery from "../BODY/gallery/GALLERY";
import QuickViewImage from "@fullyComponents/quickView/quickViewImage/quickViewImage";
import LoadingWrapper from "@components/loadingAnimation/loadingIconWithBackground";
import Cart from "../BODY/cart/cart";

import getTotalInfo from "./functions/totalItems.js";
import UseFetchData from "@hooks/useFetchData.jsx";
import ContactUs from "../BODY/contactUs/contactUs.jsx";
import useData from "@hooks/useData.jsx";

const BodyWithData = () => {
  const location = useLocation(),
    state = location.state,
    tab = location.pathname.split("/")[1];

  const { data, isLoading } = useData(state, tab);

  if (isLoading) return null;

  return (
    <div key={tab}>
      {/** Main routes */}
      <Routes location={location}>
        <Route path="/" element={<Home data={data} />} />
        <Route
          path="/gallery/:category?/:id?/*"
          element={<Gallery data={data} />}
        />
        <Route path="/contact" element={<ContactUs />} />
        {/** Extended pages */}
        <Route
          path="/uniqueImage/:category?/:id?/*"
          element={<UniqueImage />}
        />{" "}
      </Routes>

      {/** Extended pages */}
      {state?.backgroundLocation && (
        <Routes>
          <Route
            path="/:tab?/preview/:category?/:id?/*"
            element={<QuickViewImage />}
          />

          <Route path="/:tab?/cart" element={<Cart />} />
        </Routes>
      )}
    </div>
  );
};

// {state?.loadingLocation && (
//   <Routes location={state?.loadingLocation || location}>
//     <Route path="/" element={<Home />} />
//     <Route path="/gallery/:category?/:id?/*" element={<Gallery />} />
//     <Route path="/contact" element={<ContactUs />} />

//     {/** Extended pages */}
//     <Route
//       path="/uniqueImage/:category?/:id?/*"
//       element={<UniqueImage />}
//     />
//   </Routes>
// )}

const ScreenContainer = () => {
  const [cart, setCart] = useState({}); // context for whichever product is in focus

  const { totalItems, totalPrice } = getTotalInfo(cart);

  return (
    <div className={classes.widthContainer}>
      <Navbar cartItems={totalItems} />

      <div className={`${classes.contentWrapper} ${classes.paddingClass}`}>
        <UniqueImageContext.Provider
          value={{ cart, setCart, totalItems, totalPrice }}
        >
          <BodyWithData />
        </UniqueImageContext.Provider>
        <Footer />
      </div>
    </div>
  );
};

export default ScreenContainer;
