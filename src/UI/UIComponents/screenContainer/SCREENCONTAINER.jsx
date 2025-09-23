import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import classes from "./SCREENCONTAINER.module.scss";

import Footer from "../FOOTER/footer";
import Navbar from "../NAVBAR/navbar";
import MainPage from "../BODY/mainPage/MAINPAGE";
import UniqueImage from "../BODY/uniqueImagePage/uniqueImage";

import UniqueImageContext from "../BODY/cartContext";
import Gallery from "../BODY/gallery/GALLERY";
import QuickViewImage from "@fullyComponents/quickView/quickViewImage/quickViewImage";
import LoadingWrapper from "@components/loadingAnimation/loadingIconWithBackground";
import Cart from "../BODY/cart/cart";

import useFetchData from "@hooks/useFetchData.jsx";
import getTotalInfo from "./totalItems.js";

const ScreenContainer = () => {
  const { data: topLayerData, services: serviceData, loading } = useFetchData(); // fetch all data needed on front-page

  const [cart, setCart] = useState({}); // context for whichever product is in focus

  const { totalItems, totalPrice } = getTotalInfo(cart);

  const location = useLocation(),
    state = location.state,
    tab = location.pathname.split("/")[1];

  // scroll back to top each time you navigate to a new page
  useEffect(() => {
    if (tab === "preview" || tab === "cart") return;

    window.scroll({ top: 0 });
  }, [tab]);

  return (
    <>
      {/* <LoadingWrapper condition={loading} /> This stays disabled because it bugs the loading-conditions - will add another 'intro' loading for the webstie in the future perhaps*/}

      <div
        className={classes.widthContainer}
        style={{
          visibility: !loading ? "visible" : "hidden",
        }}
      >
        <Navbar />
        <div className={`${classes.contentWrapper} ${classes.paddingClass}`}>
          <UniqueImageContext.Provider
            value={{ cart, setCart, totalItems, totalPrice }}
          >
            <Routes location={state?.backgroundLocation || location}>
              <Route
                path="/"
                element={
                  <MainPage
                    topLayerData={topLayerData}
                    serviceData={serviceData}
                  />
                }
              />

              <Route
                path="/uniqueImage/:category?/:id?/*"
                element={<UniqueImage data={topLayerData} />}
              />

              <Route
                path="/gallery/:category?/:id?/*"
                element={<Gallery data={topLayerData} />}
              />
            </Routes>

            {state?.backgroundLocation && (
              <Routes>
                <Route
                  path="/:tab?/preview/:category?/:id?/*"
                  element={<QuickViewImage data={topLayerData} />}
                />

                <Route path="/:tab?cart" element={<Cart />} />
              </Routes>
            )}
          </UniqueImageContext.Provider>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ScreenContainer;
