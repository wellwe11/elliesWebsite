import { Routes, Route } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import classes from "./SCREENCONTAINER.module.scss";

import Footer from "../FOOTER/footer";
import Navbar from "../NAVBAR/navbar";
import MainPage from "../BODY/mainPage/MAINPAGE";
import UniqueImage from "../BODY/uniqueImagePage/uniqueImage";
import tryFetchFn from "@functions/tryFetchFn";

import UniqueImageContext from "../BODY/uniqueImageContext";

const ScreenContainer = () => {
  const [topLayerData, setTopLayerData] = useState(null);
  const [serviceData, setServiceData] = useState(null);
  const [uniqueImage, setUniqueImage] = useState(null);

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
            arr.map((item, index) => ({ ...item, id: index })),
          ])
        );

        if (assignIds) {
          setTopLayerData(assignIds);
        }

        setServiceData(dataLink);
      }
    };
    fetchData();
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={classes.widthContainer}>
        <Navbar />
        <div className={`${classes.contentWrapper} ${classes.paddingClass}`}>
          <UniqueImageContext.Provider value={{ uniqueImage, setUniqueImage }}>
            <Routes location={location}>
              <Route
                path="/"
                element={
                  topLayerData && serviceData ? (
                    <MainPage
                      topLayerData={topLayerData}
                      serviceData={serviceData}
                    />
                  ) : (
                    <div>Data is loading...</div>
                  )
                }
              />
              <Route
                path="/uniqueImage/:type/:id"
                element={topLayerData && <UniqueImage data={topLayerData} />}
              />
            </Routes>
          </UniqueImageContext.Provider>
          {/* <Footer /> */}
        </div>
      </div>
    </Suspense>
  );
};

export default ScreenContainer;
