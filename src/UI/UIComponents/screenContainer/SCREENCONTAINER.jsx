import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import classes from "./SCREENCONTAINER.module.scss";

import Footer from "../FOOTER/footer";
import Navbar from "../NAVBAR/navbar";
import MainPage from "../BODY/mainPage/MAINPAGE";
import UniqueImage from "../BODY/uniqueImagePage/uniqueImage";
import tryFetchFn from "@functions/tryFetchFn";

import UniqueImageContext from "../BODY/uniqueImageContext";
import Gallery from "../BODY/gallery/GALLERY";
import QuickViewImage from "@fullyComponents/quickView/quickViewImage/quickViewImage";
import LoadingWrapper from "@components/loadingAnimation/loadingIconWithBackground";

const ScreenContainer = () => {
  const [topLayerData, setTopLayerData] = useState(null); // fetched data with id added
  const [loadPage, setLoadPage] = useState(false);
  const [serviceData, setServiceData] = useState(null); // Services data
  const [uniqueImage, setUniqueImage] = useState(null); // context for whichever product is in focus

  const location = useLocation();
  const state = location.state;

  useEffect(() => {
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
            setLoadPage(true);
          }, 1500);
        }

        setServiceData(dataLink);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <LoadingWrapper condition={!loadPage} />

      <div
        className={classes.widthContainer}
        style={{ visibility: loadPage ? "visible" : "hidden" }}
      >
        <Navbar />
        <div className={`${classes.contentWrapper} ${classes.paddingClass}`}>
          <UniqueImageContext.Provider value={{ uniqueImage, setUniqueImage }}>
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
                path="/uniqueImage/:type/:id"
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
                  path="/:tab?/preview/:type/:id"
                  element={<QuickViewImage data={topLayerData} />}
                />
              </Routes>
            )}
          </UniqueImageContext.Provider>
          {/* <Footer /> */
          /** Currently inactive because it doesnt work with uniqueImage-page */}
        </div>
      </div>
    </>
  );
};

export default ScreenContainer;
