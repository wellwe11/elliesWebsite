import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import classes from "./SCREENCONTAINER.module.scss";

import Footer from "../FOOTER/footer";
import Navbar from "../NAVBAR/navbar";
import MainPage from "../BODY/mainPage/MAINPAGE";
import UniqueImage from "../BODY/uniqueImagePage/uniqueImage";
import tryFetchFn from "@functions/tryFetchFn";

import UniqueImageContext from "../BODY/cartContext";
import Gallery from "../BODY/gallery/GALLERY";
import QuickViewImage from "@fullyComponents/quickView/quickViewImage/quickViewImage";
import LoadingWrapper from "@components/loadingAnimation/loadingIconWithBackground";
import Cart from "../BODY/cart/cart";

const ScreenContainer = () => {
  const [topLayerData, setTopLayerData] = useState(null); // fetched data with id added
  const [loading, setLoading] = useState(false);
  const [serviceData, setServiceData] = useState(null); // Services data

  const [cart, setCart] = useState({}); // context for whichever product is in focus
  const totalItems = () => Object.values(cart)?.flat()?.length;

  const totalPrice = () =>
    Object.values(cart)
      .flat()
      .reduce((sum, item) => sum + item?._embedded?.details?.price, 0);

  const location = useLocation();
  const state = location.state;
  const tab = location.pathname.split("/")[1];

  // scroll back to top each time you navigate to a new page
  useEffect(() => {
    if (tab === "preview" || tab === "cart") return;

    window.scroll({ top: 0 });
  }, [tab]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const imagesLink = "/API_imitation/images.json";
      const servicesLink = "/API_imitation/services.json";

      const dataImages = await tryFetchFn(imagesLink);
      const dataLink = await tryFetchFn(servicesLink);

      if (dataImages && dataLink) {
        // entries to be able to map the dataImages
        const dataImagesEntries = Object.entries(dataImages);
        // new array which adds an id to each object. Each object has an id attached to it, which is it's index on the fetched object.
        // Later when we need to access this object, for example, if user is on uniqueImage page, it can directly find the matching object due to it's ID.
        const assignIds = Object.fromEntries(
          dataImagesEntries.map(([key, arr]) => [
            key,
            arr.map((item, index) => ({ ...item, id: +index })),
          ])
        );

        if (assignIds) {
          setTimeout(() => {
            setTopLayerData(assignIds);
          }, 1400);
          setTimeout(() => {
            setLoading(false);
          }, 1500);
        }

        setServiceData(dataLink);
      }
    };
    fetchData();
  }, []);

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
